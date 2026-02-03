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
      import('./layout/shell.component').then((m) => m.ShellComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/overview/overview.component').then((m) => m.OverviewComponent),
      },
      {
        path: 'buttons',
        loadComponent: () =>
          import('./pages/buttons/buttons.component').then((m) => m.ButtonsComponent),
      },
      {
        path: 'forms',
        loadComponent: () =>
          import('./pages/forms/forms.component').then((m) => m.FormsComponent),
      },
      {
        path: 'feedback',
        loadComponent: () =>
          import('./pages/feedback/feedback.component').then((m) => m.FeedbackComponent),
      },
      {
        path: 'data-display',
        loadComponent: () =>
          import('./pages/data-display/data-display.component').then((m) => m.DataDisplayComponent),
      },
      {
        path: 'navigation',
        loadComponent: () =>
          import('./pages/navigation/navigation.component').then((m) => m.NavigationComponent),
      },
      {
        path: 'layouts',
        loadComponent: () =>
          import('./pages/layouts/layouts.component').then((m) => m.LayoutsComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
