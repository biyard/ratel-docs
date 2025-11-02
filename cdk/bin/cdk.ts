#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DocsStack } from '../lib/docs-stack.js';
import { CertificateStack } from '../lib/certificate-stack.js';

const app = new cdk.App();
const env = process.env.ENV || 'dev';

// Create main docs stack in ap-northeast-2
new DocsStack(app, 'RatelDocsStack', {
  stackName: `ratel-${env}-docs`,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'us-east-1' },
});
