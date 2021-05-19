import * as fs from "fs"
import * as path from "path"

import { Stack, StackProps, App } from "aws-cdk-lib"
import { Construct } from "constructs"

import { ForecastAPIGateway } from "./forecast_api_gateway"


export class EndpointsKitStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {

    const envDictionaryString = fs.readFileSync(path.join(__dirname, "env.json"), {encoding: "utf8"})
    const envDictionary = JSON.parse(envDictionaryString)
    process.env["FORECAST_ARN"] = envDictionary["forecastArn"]

    super(scope, id, props)

    new ForecastAPIGateway(this)

  }

}
