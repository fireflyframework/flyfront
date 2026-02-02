/**
 * @flyfront/ui - Layout Components
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 *
 * Layout components for common page structures and patterns.
 */

// Auth layout for login/register pages
export { AuthLayoutComponent } from './auth-layout.component';

// Dashboard layout for admin interfaces
export { DashboardLayoutComponent } from './dashboard-layout.component';
export type { DashboardNavItem, BreadcrumbItem as DashboardBreadcrumbItem } from './dashboard-layout.component';

// Simple layout components
export {
  CenteredLayoutComponent,
  SplitLayoutComponent,
  StackLayoutComponent,
  PageLayoutComponent,
} from './simple-layouts.component';
