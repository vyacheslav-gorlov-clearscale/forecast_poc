import * as Lambda from "@aws-cdk/aws-lambda"
import * as IAM from "@aws-cdk/aws-iam"
import * as CDK from "@aws-cdk/core"
import {Duration} from "@aws-cdk/core";

export class MakeForecastLambda extends Lambda.Function {

    constructor(scope: CDK.Construct) {

        const lambdaRole = new IAM.Role(scope, `make_forecast_role`, {
            assumedBy: new IAM.ServicePrincipal("lambda.amazonaws.com"),
            path: "/",
            managedPolicies: [
                IAM.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"),
                IAM.ManagedPolicy.fromAwsManagedPolicyName("AmazonForecastFullAccess")
            ]
        })

        const forecastArn: string = process.env["FORECAST_ARN"] ?? "<MAILFORMED FORECAST ARN>"

        super(scope, `make_forecast`, {
            runtime: Lambda.Runtime.PYTHON_3_8,
            handler: "lambda_function.lambda_handler",
            code: new Lambda.AssetCode("lambda_src/make_forecast"),
            environment: {
                FORECAST_ARN: forecastArn
            },
            role: lambdaRole,
            memorySize: 256,
            timeout: Duration.minutes(3)
        })

    }

}
