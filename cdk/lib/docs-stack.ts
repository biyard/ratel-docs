import {
  aws_route53 as route53,
  aws_certificatemanager as acm,
} from "aws-cdk-lib";
import * as targets from "aws-cdk-lib/aws-route53-targets";

import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cf from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigw from "aws-cdk-lib/aws-apigateway";

export class DocsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const {
      GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET,
      ALLOWED_REDIRECT_ORIGIN,
      DOMAIN,
      BASE_DOMAIN,
      ENV,
    } = process.env as Record<string, string>;

    const zone = route53.HostedZone.fromLookup(this, "RootZone", {
      domainName: BASE_DOMAIN,
    });

    // Import the CloudFront certificate from us-east-1
    const cert = new acm.Certificate(this, "Cert", {
      domainName: DOMAIN,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    const bucket = new s3.Bucket(this, "Bucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const oai = new cloudfront.OriginAccessIdentity(this, "OAI");
    bucket.grantRead(oai);

    const origin = origins.S3BucketOrigin.withOriginAccessIdentity(bucket, {
      originAccessIdentity: oai,
    });

    // CloudFront function for SPA routing
    const spaRoutingFunction = new cf.Function(
      this,
      `SpaRoutingFunction-${ENV}`,
      {
        code: cf.FunctionCode.fromInline(`
    function handler(event) {
      var request = event.request;
      var uri = request.uri;

      // Check if URI has a file extension
      var hasFileExtension = /\\.[a-zA-Z0-9]+$/.test(uri);

      // If no file extension, it's a page route - append index.html
      if (!hasFileExtension) {
        // Special handling for /admin route
        if (uri === '/admin' || uri === '/admin/') {
          request.uri = '/admin/index.html';
        }
        // For other routes without trailing slash, add /index.html
        else if (!uri.endsWith('/')) {
          request.uri = uri + '/index.html';
        }
        // For routes with trailing slash, add index.html
        else {
          request.uri = uri + 'index.html';
        }
      }

      return request;
    }
          `),
      },
    );

    const prodDist = new cf.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: spaRoutingFunction,
            eventType: cf.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      defaultRootObject: "index.html",
      domainNames: [DOMAIN],
      certificate: cert,
    });

    if (ENV === "prod") {
      // OAuth infrastructure for Decap CMS
      const oauthDomain = `oauth.${DOMAIN}`;
      const oauthCert = new acm.Certificate(this, "OAuthCert", {
        domainName: oauthDomain,
        validation: acm.CertificateValidation.fromDns(zone),
      });

      // OAuth Lambda + API Gateway
      const oauthFn = new NodejsFunction(this, "GithubOAuthFn", {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: "../lambda/github-oauth.ts",
        handler: "handler",
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

      // Custom domain for OAuth API
      const oauthApiDomain = new apigw.DomainName(this, "OAuthApiDomain", {
        domainName: oauthDomain,
        certificate: oauthCert,
        endpointType: apigw.EndpointType.REGIONAL,
      });

      new apigw.BasePathMapping(this, "OAuthApiMapping", {
        domainName: oauthApiDomain,
        restApi: api,
      });

      // DNS for OAuth API
      new route53.ARecord(this, "OAuthApiAliasV4", {
        zone,
        recordName: oauthDomain.replace(`.${BASE_DOMAIN}`, ""),
        target: route53.RecordTarget.fromAlias(
          new targets.ApiGatewayDomain(oauthApiDomain),
        ),
      });

      new cdk.CfnOutput(this, "OAuthApiUrl", { value: api.url });
      new cdk.CfnOutput(this, "OAuthDomain", {
        value: `https://${oauthDomain}`,
      });
    }

    // DNS for docs site (CloudFront)
    new route53.ARecord(this, "AliasV4", {
      zone,
      recordName: DOMAIN.replace(`.${BASE_DOMAIN}`, ""),
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(prodDist),
      ),
    });
    new route53.AaaaRecord(this, "AliasV6", {
      zone,
      recordName: DOMAIN.replace(`.${BASE_DOMAIN}`, ""),
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(prodDist),
      ),
    });

    // Deploy built site to S3
    new s3deploy.BucketDeployment(this, `RatelDocsBucketDeployment-${ENV}`, {
      destinationBucket: bucket,
      distribution: prodDist,
      distributionPaths: ["/*"],
      sources: [s3deploy.Source.asset("../build")],
    });

    new cdk.CfnOutput(this, "ProdBucketName", { value: bucket.bucketName });
    new cdk.CfnOutput(this, "ProdDistributionId", {
      value: prodDist.distributionId,
    });
    new cdk.CfnOutput(this, "SiteUrl", { value: `https://${DOMAIN}` });
  }
}
