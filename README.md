# Ratel Docs Template (Docusaurus + Decap CMS + AWS + GitHub Actions)

This template provides:
- **Docusaurus** for docs site
- **Decap CMS** at `/admin` for web editing (GitHub OAuth)
- **AWS S3 + CloudFront** for hosting
- **AWS API Gateway + Lambda** as OAuth proxy for Decap CMS
- **GitHub Actions** for PR Preview and Production Deploy

## Quick Start

```bash
# install deps
npm i

# dev
npm run start

# build
npm run build
npm run serve
```

## Configure Decap CMS

- Edit `static/admin/config.yml`:
  - `backend.repo`: set your GitHub org/repo
  - `backend.base_url`: set to the API Gateway URL printed by CDK (OAuthApiUrl)
- Visit `/admin` to login with GitHub once the OAuth proxy is deployed.

## AWS Deploy (CDK)

```bash
cd cdk
npm i
npm run build
cdk bootstrap
cdk deploy
```

> Update environment variables for the Lambda in `cdk/lib/docs-stack.ts` (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ALLOWED_REDIRECT_ORIGIN`).

## GitHub Actions Secrets

Create repository secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (e.g., ap-northeast-2)
- `PROD_BUCKET`
- `PROD_DISTRIBUTION_ID`
- `PREVIEW_BUCKET`

## Notes

- This is a minimal, opinionated scaffold. Adjust as needed for your environment.
- For i18n and advanced features, edit `docusaurus.config.ts` and `static/admin/config.yml` collections.
