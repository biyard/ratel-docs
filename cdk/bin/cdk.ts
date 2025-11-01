#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DocsStack } from '../lib/docs-stack.js';
import { CertificateStack } from '../lib/certificate-stack.js';

const app = new cdk.App();
const env = process.env.ENV || 'dev';

// Create certificate stack in us-east-1 (required for CloudFront)
const certStack = new CertificateStack(app, 'RatelDocsCertStack', {
  stackName: `ratel-${env}-docs-cert`,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-1' },
  crossRegionReferences: true,
});

// Create main docs stack in ap-northeast-2
new DocsStack(app, 'RatelDocsStack', {
  stackName: `ratel-${env}-docs`,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'ap-northeast-2' },
  crossRegionReferences: true,
  certificateArn: certStack.certificateArn,
});
