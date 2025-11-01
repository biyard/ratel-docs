#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DocsStack } from '../lib/docs-stack.js';

const app = new cdk.App();
const env = process.env.ENV || 'dev';

new DocsStack(app, 'RatelDocsStack', {
  stackName: `ratel-${env}-docs`,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'ap-northeast-2' }
});
