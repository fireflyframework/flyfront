/**
 * @flyfront/demo-app - app.routes
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 */

import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
