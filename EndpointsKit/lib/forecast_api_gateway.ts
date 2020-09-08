import * as CDK from "@aws-cdk/core"
import * as APIGateway from "@aws-cdk/aws-apigateway"
import { MakeForecastLambda } from "./make_foracast_lambda"

export class ForecastAPIGateway extends APIGateway.RestApi {

    constructor(scope: CDK.Construct) {
        super(scope, `ForecastAPIGateway`)

        const forecasts = this.root.addResource("forecasts")

        const makeForecastLambda = new MakeForecastLambda(scope)
        const makeForecastIntegration = new APIGateway.LambdaIntegration(makeForecastLambda, {
            proxy: true
        })
        forecasts.addMethod("POST", makeForecastIntegration)
    }

}
