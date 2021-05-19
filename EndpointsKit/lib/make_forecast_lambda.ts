import { aws_iam, aws_lambda, Duration } from "aws-cdk-lib"
import { Construct } from "constructs"


export class MakeForecastLambda extends aws_lambda.Function {

    constructor(scope: Construct) {

        const lambdaRole = new aws_iam.Role(scope, `make_forecast_role`, {
            assumedBy: new aws_iam.ServicePrincipal("lambda.amazonaws.com"),
            path: "/",
            managedPolicies: [
                aws_iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"),
                aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonForecastFullAccess")
            ]
        })

        const forecastArn: string = process.env["FORECAST_ARN"] ?? "<MAILFORMED FORECAST ARN>"

        super(scope, `make_forecast`, {
            runtime: aws_lambda.Runtime.PYTHON_3_8,
            handler: "lambda_function.lambda_handler",
            code: new aws_lambda.AssetCode("lambda_src/make_forecast"),
            environment: {
                FORECAST_ARN: forecastArn
            },
            role: lambdaRole,
            memorySize: 256,
            timeout: Duration.minutes(3)
        })
    }

}
