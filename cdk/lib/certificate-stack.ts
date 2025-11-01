import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";

export class CertificateStack extends cdk.Stack {
  public readonly certificateArn: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { DOMAIN, BASE_DOMAIN } = process.env as Record<string, string>;

    // Look up the hosted zone (must be in the same account, but can be queried from any region)
    const zone = route53.HostedZone.fromLookup(this, "RootZone", {
      domainName: BASE_DOMAIN,
    });

    // Create certificate in us-east-1 for CloudFront
    const cert = new acm.Certificate(this, "CloudFrontCert", {
      domainName: DOMAIN,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    this.certificateArn = cert.certificateArn;

    new cdk.CfnOutput(this, "CertificateArn", {
      value: this.certificateArn,
      exportName: `${id}-CertificateArn`,
    });
  }
}
