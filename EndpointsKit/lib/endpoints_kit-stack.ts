import * as cdk from '@aws-cdk/core'
import { v4 as UUID } from "uuid";

import { ForecastAPIGateway } from "./forecast_api_gateway"

export class EndpointsKitStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    const prefix = UUID()

    super(scope, `${id}-${prefix}`, props)

    new ForecastAPIGateway(this, prefix)

  }
}
