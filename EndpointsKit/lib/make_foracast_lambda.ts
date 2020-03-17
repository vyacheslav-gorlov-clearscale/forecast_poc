import * as Lambda from "@aws-cdk/aws-lambda"
import * as IAM from "@aws-cdk/aws-iam"
import * as CDK from "@aws-cdk/core"
import {Duration} from "@aws-cdk/core";

export class MakeForecastLambda extends Lambda.Function {

    constructor(scope: CDK.Construct, prefix: string) {

        const lambdaRole = new IAM.Role(scope, `make_forecast_role_${prefix}`, {
            assumedBy: new IAM.ServicePrincipal("lambda.amazonaws.com"),
            path: "/",
            managedPolicies: [
                IAM.ManagedPolicy.fromAwsManagedPolicyName("AWSLambdaBasicExecutionRole"),
                IAM.ManagedPolicy.fromAwsManagedPolicyName("AmazonForecastFullAccess")
            ]
        })

        super(scope, `make_forecast_${prefix}`, {
            runtime: Lambda.Runtime.PYTHON_3_8,
            handler: "lambda_function.lambda_handler",
            code: new Lambda.AssetCode("lambda_src/make_forecast"),
            environment: {
                FORECAST_ARN: "123"
            },
            role: lambdaRole,
            memorySize: 256,
            timeout: Duration.minutes(3)
        });

    }

}
