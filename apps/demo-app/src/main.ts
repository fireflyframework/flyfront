/**
 * @flyfront/demo-app - main
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
