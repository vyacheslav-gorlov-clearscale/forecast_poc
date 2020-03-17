import * as cdk from '@aws-cdk/core'
import * as fs from "fs"
import * as path from "path"

import { ForecastAPIGateway } from "./forecast_api_gateway"

export class EndpointsKitStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {

    const envDictionaryString = fs.readFileSync(path.join(__dirname, "env.json"), {encoding: "utf8"})
    const envDictionary = JSON.parse(envDictionaryString)
    process.env["FORECAST_ARN"] = envDictionary["forecastArn"]

    super(scope, id, props)

    new ForecastAPIGateway(this);
  }
}
