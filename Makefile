ENV ?= prod
BASE_DOMAIN ?= ratel.foundation
DOMAIN ?= docs.$(BASE_DOMAIN)
GITHUB_CLIENT_ID ?= Ov23li04hY1c3CTq6JYt
GITHUB_CLIENT_SECRET ?= f7901fce4d9d0476ef47252d791b772d4f6a76f6
ALLOWED_REDIRECT_ORIGIN ?= https://docs.ratel.foundation,https://docs.dev.ratel.foundation
AWS_ACCESS_KEY_ID ?= $(shell aws configure get aws_access_key_id $(AWS_FLAG))
AWS_SECRET_ACCESS_KEY ?= $(shell aws configure get aws_secret_access_key $(AWS_FLAG))
AWS_REGION ?= $(shell aws configure get region)

BUILD_ENVS ?= ENV=$(ENV) \
								BASE_DOMAIN=$(BASE_DOMAIN) \
								DOMAIN=$(DOMAIN) \
								GITHUB_CLIENT_ID=$(GITHUB_CLIENT_ID) \
								GITHUB_CLIENT_SECRET=$(GITHUB_CLIENT_SECRET) \
								ALLOWED_REDIRECT_ORIGIN=$(ALLOWED_REDIRECT_ORIGIN) \
								AWS_ACCESS_KEY_ID=$(AWS_ACCESS_KEY_ID) \
								AWS_SECRET_ACCESS_KEY=$(AWS_SECRET_ACCESS_KEY) \
								AWS_REGION=$(AWS_REGION)

deploy:
	npm run build
	cd cdk && $(BUILD_ENVS) npm i
	cd cdk && $(BUILD_ENVS) npm run build
	cd cdk && $(BUILD_ENVS) cdk synth
	cd cdk && $(BUILD_ENVS) cdk deploy --all --require-approval never
