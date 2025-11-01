import {
  Stack,
  StackProps,
  aws_route53 as route53,
  aws_certificatemanager as acm,
} from "aws-cdk-lib";
import * as targets from "aws-cdk-lib/aws-route53-targets";

import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cf from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";

export class DocsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const {
      GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET,
      ALLOWED_REDIRECT_ORIGIN,
      DOMAIN,
      BASE_DOMAIN,
    } = process.env as Record<string, string | undefined>;

    const zone = route53.HostedZone.fromLookup(this, "RootZone", {
      domainName: BASE_DOMAIN,
    });

    const cert = new acm.Certificate(this, "Cert", {
      domainName: DOMAIN,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    // Buckets
    const prodBucket = new s3.Bucket(this, "DocsProdBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    // CloudFront Prod
    const prodDist = new cf.Distribution(this, "DocsProdDistribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(prodBucket),
        viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "index.html",
      domainNames: [DOMAIN],
      certificate: cert,
    });

    prodBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [prodBucket.arnForObjects("*")],
        principals: [new iam.ServicePrincipal("cloudfront.amazonaws.com")],
        conditions: {
          StringEquals: {
            "AWS:SourceArn": `arn:aws:cloudfront::${cdk.Stack.of(this).account}:distribution/${prodDist.distributionId}`,
          },
        },
      }),
    );

    // OAuth Lambda + API Gateway
    const oauthFn = new lambda.Function(this, "GithubOAuthFn", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "github-oauth.handler",
      code: lambda.Code.fromAsset("../lambda"),
      environment: {
        GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET,
        ALLOWED_REDIRECT_ORIGIN,
      },
    });

    const api = new apigw.LambdaRestApi(this, "DocsOAuthApi", {
      handler: oauthFn,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: ["GET", "POST", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
      },
    });

    const oauth = api.root.addResource("oauth");
    oauth.addResource("authorize").addMethod("GET");
    oauth.addResource("callback").addMethod("GET");
    oauth.addResource("token").addMethod("GET");

    new route53.ARecord(this, "AliasV4", {
      zone,
      recordName: DOMAIN.replace(`.${BASE_DOMAIN}`, ""), // e.g., 'dev'
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution),
      ),
    });
    new route53.AaaaRecord(this, "AliasV6", {
      zone,
      recordName: DOMAIN.replace(`.${BASE_DOMAIN}`, ""), // e.g., 'dev'
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution),
      ),
    });

    new cdk.CfnOutput(this, "ProdBucketName", { value: prodBucket.bucketName });
    new cdk.CfnOutput(this, "ProdDistributionId", {
      value: prodDist.distributionId,
    });
    new cdk.CfnOutput(this, "OAuthApiUrl", { value: api.url });
  }
}
