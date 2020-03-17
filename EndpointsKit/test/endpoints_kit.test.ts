import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import EndpointsKit = require('../lib/endpoints_kit-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new EndpointsKit.EndpointsKitStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
