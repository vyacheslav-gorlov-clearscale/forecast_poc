import * as CDK from "@aws-cdk/core"
import * as APIGateway from "@aws-cdk/aws-apigateway"
import { MakeForecastLambda } from "./make_foracast_lambda"

export class ForecastAPIGateway extends APIGateway.RestApi {

    constructor(scope: CDK.Construct, prefix: string) {
        super(scope, `ForecastAPIGateway_${prefix}`)

        const forecasts = this.root.addResource("forecasts")

        const makeForecastLambda = new MakeForecastLambda(scope, prefix)
        const makeForecastIntegration = new APIGateway.LambdaIntegration(makeForecastLambda)
        forecasts.addMethod("POST", makeForecastIntegration)
    }

}
