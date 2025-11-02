ENV ?= prod
BASE_DOMAIN ?= ratel.foundation
DOMAIN ?= docs.ratel.foundation
AWS_ACCESS_KEY_ID ?= $(shell aws configure get aws_access_key_id $(AWS_FLAG))
AWS_SECRET_ACCESS_KEY ?= $(shell aws configure get aws_secret_access_key $(AWS_FLAG))
AWS_REGION ?= $(shell aws configure get region)

BUILD_ENVS ?= ENV=$(ENV) \
								BASE_DOMAIN=$(BASE_DOMAIN) \
								DOMAIN=$(DOMAIN) \
								AWS_ACCESS_KEY_ID=$(AWS_ACCESS_KEY_ID) \
								AWS_SECRET_ACCESS_KEY=$(AWS_SECRET_ACCESS_KEY) \
								AWS_REGION=$(AWS_REGION)

deploy:
	npm i
	npm run build
	cd cdk && $(BUILD_ENVS) npm i
	cd cdk && $(BUILD_ENVS) npm run build
	cd cdk && $(BUILD_ENVS) cdk synth
	cd cdk && $(BUILD_ENVS) cdk deploy --all --require-approval never
