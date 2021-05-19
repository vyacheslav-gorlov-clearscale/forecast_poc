import { aws_apigateway } from "aws-cdk-lib"
import { MakeForecastLambda } from "./make_forecast_lambda"
import { Construct } from "constructs"


export class ForecastAPIGateway extends aws_apigateway.RestApi {

    constructor(scope: Construct) {
        super(scope, `ForecastAPIGateway`)

        const forecasts = this.root.addResource("forecasts")

        const makeForecastLambda = new MakeForecastLambda(scope)
        const makeForecastIntegration = new aws_apigateway.LambdaIntegration(makeForecastLambda, {
            proxy: true
        })
        forecasts.addMethod("POST", makeForecastIntegration)
    }

}
