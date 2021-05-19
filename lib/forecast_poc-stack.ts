import { Stack, StackProps, aws_iam, aws_sagemaker } from 'aws-cdk-lib'
import { Construct } from 'constructs'

export class ForecastPocStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const iamRole = new aws_iam.Role(this, "NotebookInstanceRole", {
      assumedBy: new aws_iam.ServicePrincipal("sagemaker.amazonaws.com"),
      path: "/",
      managedPolicies: [
        aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSageMakerFullAccess"),
        aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"),
        aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonForecastFullAccess"),
        aws_iam.ManagedPolicy.fromAwsManagedPolicyName("IAMFullAccess")
      ]
    })

    const sageMakerInstance = new aws_sagemaker.CfnNotebookInstance(this, "NotebookInstance", {
      instanceType: "ml.t3.medium",
      roleArn: iamRole.roleArn,
      notebookInstanceName: "Forecast-POC",
      defaultCodeRepository: "https://github.com/gorlov-clearscale/forecast_poc.git",
      volumeSizeInGb: 20
    })

  }

}
