BASE_DOMAIN ?= ratel.foundation
DOMAIN ?= docs.$(BASE_DOMAIN)
GITHUB_CLIENT_ID ?=
GITHUB_CLIENT_SECRET ?=
ALLOWED_REDIRECT_ORIGIN ?= https://docs.ratel.foundation,https://docs.dev.ratel.foundation
AWS_ACCESS_KEY_ID ?= $(shell aws configure get aws_access_key_id $(AWS_FLAG))
AWS_SECRET_ACCESS_KEY ?= $(shell aws configure get aws_secret_access_key $(AWS_FLAG))
AWS_REGION ?= $(shell aws configure get region)

