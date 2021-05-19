import * as cdk from 'aws-cdk-lib';
import * as ForecastPoc from '../lib/forecast_poc-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ForecastPoc.ForecastPocStack(app, 'MyTestStack');
    // THEN
    const actual = app.synth().getStackArtifact(stack.artifactId).template;
    expect(actual.Resources ?? {}).toEqual({});
});
