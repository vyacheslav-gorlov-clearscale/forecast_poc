#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EndpointsKitStack } from '../lib/endpoints_kit-stack';

const app = new cdk.App();
new EndpointsKitStack(app, 'EndpointsKitStack');
