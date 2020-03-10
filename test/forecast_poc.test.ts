import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import ForecastPoc = require('../lib/forecast_poc-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ForecastPoc.ForecastPocStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
