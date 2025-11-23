ENV ?= prod
BASE_DOMAIN ?= ratel.foundation
DOMAIN ?= docs.ratel.foundation
AWS_ACCESS_KEY_ID ?= $(shell aws configure get aws_access_key_id $(AWS_FLAG))
AWS_SECRET_ACCESS_KEY ?= $(shell aws configure get aws_secret_access_key $(AWS_FLAG))
AWS_REGION ?= $(shell aws configure get region)

GITHUB_CLIENT_ID ?=
GITHUB_CLIENT_SECRET ?=
ALLOWED_REDIRECT_ORIGIN ?= https://docs.ratel.foundation,https://docs.dev.ratel.foundation,http://localhost:3000

STACK ?= ratel-$(ENV)-docs

WEB_CDN_ID=$(shell aws cloudformation describe-stacks \
  --region us-east-1 \
  --stack-name $(STACK) \
  --query "Stacks[0].Outputs[?OutputKey=='ProdDistributionId'].OutputValue" \
  --output text)

WEB_BUCKET=$(shell aws cloudformation describe-stacks \
  --region us-east-1 \
  --stack-name $(STACK) \
  --query "Stacks[0].Outputs[?OutputKey=='ProdBucketName'].OutputValue" \
  --output text)


BUILD_ENVS ?= ENV=$(ENV) \
								BASE_DOMAIN=$(BASE_DOMAIN) \
								DOMAIN=$(DOMAIN) \
								AWS_ACCESS_KEY_ID=$(AWS_ACCESS_KEY_ID) \
								AWS_SECRET_ACCESS_KEY=$(AWS_SECRET_ACCESS_KEY) \
								AWS_REGION=$(AWS_REGION) \
								GITHUB_CLIENT_ID=$(GITHUB_CLIENT_ID) \
								GITHUB_CLIENT_SECRET=$(GITHUB_CLIENT_SECRET) \
								ALLOWED_REDIRECT_ORIGIN=$(ALLOWED_REDIRECT_ORIGIN)

node_modules:
	npm i

run: node_modules build
	npm run serve

.PHONY: build
build: node_modules
	npm run build

sync: build
	aws s3 sync ./build s3://$(WEB_BUCKET)
	aws cloudfront create-invalidation --distribution-id $(WEB_CDN_ID) --paths "/*"

deploy:
	cd cdk && $(BUILD_ENVS) npm i
	cd cdk && $(BUILD_ENVS) npm run build
	cd cdk && $(BUILD_ENVS) cdk synth
	cd cdk && $(BUILD_ENVS) cdk deploy --all --require-approval never
