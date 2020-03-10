#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ForecastPocStack } from '../lib/forecast_poc-stack';

const app = new cdk.App();
new ForecastPocStack(app, 'ForecastPocStack');
