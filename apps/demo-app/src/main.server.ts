/**
 * @flyfront/demo-app - main.server
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 */

import {
  BootstrapContext,
  bootstrapApplication,
} from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, config, context);

export default bootstrap;
