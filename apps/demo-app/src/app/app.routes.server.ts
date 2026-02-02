/**
 * @flyfront/demo-app - app.routes.server
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 */

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
