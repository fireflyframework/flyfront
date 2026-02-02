/**
 * @flyfront/ui - Dashboard Layout Component
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 *
 * A comprehensive dashboard layout with collapsible sidebar, header with
 * breadcrumbs, and footer support. Ideal for admin panels and data-heavy applications.
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  booleanAttribute,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Navigation item for the sidebar
 */
export interface DashboardNavItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon HTML or class */
  icon?: string;
  /** Router link or URL */
  link?: string;
  /** Whether the item is active */
  active?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Badge text/count */
  badge?: string | number;
  /** Child navigation items */
  children?: DashboardNavItem[];
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Router link or URL */
  link?: string;
}

/**
 * Dashboard layout component for admin interfaces
 *
 * @description
 * Provides a full-featured dashboard layout with:
 * - Collapsible sidebar navigation
 * - Header with breadcrumbs and user menu
 * - Footer support
 * - Responsive design with mobile menu
 *
 * @example
 * ```html
 * <fly-dashboard-layout
 *   [navItems]="navigation"
 *   [breadcrumbs]="breadcrumbs"
 *   [userName]="user.name"
 *   [userAvatar]="user.avatar"
 *   (navItemClick)="onNavClick($event)"
 *   (logout)="onLogout()"
 * >
 *   <ng-container header-actions>
 *     <fly-button variant="ghost">Notifications</fly-button>
 *   </ng-container>
 *
 *   <!-- Main content -->
 *   <router-outlet />
 * </fly-dashboard-layout>
 * ```
 */
@Component({
  selector: 'fly-dashboard-layout',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside [class]="sidebarClasses()">
        <!-- Logo area -->
        <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          @if (logoUrl) {
            <img [src]="logoUrl" [alt]="logoAlt" class="h-8 w-auto" />
          } @else {
            <span class="text-xl font-bold text-primary-600">{{ appName }}</span>
          }
          @if (!sidebarCollapsed()) {
            <button
              class="lg:hidden p-2 rounded-md hover:bg-gray-100"
              (click)="toggleSidebar()"
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          }
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-4">
          @for (item of navItems; track item.id) {
            <div class="px-3 mb-1">
              <button
                [class]="getNavItemClasses(item)"
                [disabled]="item.disabled"
                (click)="onNavItemClick(item)"
              >
                @if (item.icon) {
                  <span class="w-5 h-5 flex-shrink-0" [innerHTML]="item.icon"></span>
                }
                @if (!sidebarCollapsed()) {
                  <span class="flex-1 text-left">{{ item.label }}</span>
                  @if (item.badge) {
                    <span class="px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-600">
                      {{ item.badge }}
                    </span>
                  }
                  @if (item.children && item.children.length > 0) {
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  }
                }
              </button>
            </div>
          }
        </nav>

        <!-- Sidebar footer -->
        @if (showSidebarFooter && !sidebarCollapsed()) {
          <div class="border-t border-gray-200 p-4">
            <ng-content select="[sidebar-footer]"></ng-content>
          </div>
        }
      </aside>

      <!-- Mobile sidebar overlay -->
      @if (!sidebarCollapsed()) {
        <div
          class="lg:hidden fixed inset-0 bg-black/50 z-[99]"
          role="presentation"
          tabindex="-1"
          (click)="toggleSidebar()"
          (keydown.escape)="toggleSidebar()"
        ></div>
      }

      <!-- Main content area -->
      <div [class]="mainContentClasses()">
        <!-- Header -->
        <header class="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 gap-4">
          <!-- Mobile menu button -->
          <button
            class="lg:hidden p-2 rounded-md hover:bg-gray-100"
            (click)="toggleSidebar()"
            aria-label="Open sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Collapse sidebar button (desktop) -->
          <button
            class="hidden lg:flex p-2 rounded-md hover:bg-gray-100"
            (click)="toggleCollapse()"
            [attr.aria-label]="sidebarMinimized() ? 'Expand sidebar' : 'Collapse sidebar'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              @if (sidebarMinimized()) {
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              } @else {
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              }
            </svg>
          </button>

          <!-- Breadcrumbs -->
          @if (breadcrumbs && breadcrumbs.length > 0) {
            <nav class="hidden md:flex items-center gap-2 text-sm">
              @for (crumb of breadcrumbs; track crumb.label; let last = $last) {
                @if (crumb.link && !last) {
                  <a [href]="crumb.link" class="text-gray-500 hover:text-gray-700">{{ crumb.label }}</a>
                } @else {
                  <span [class]="last ? 'text-gray-900 font-medium' : 'text-gray-500'">{{ crumb.label }}</span>
                }
                @if (!last) {
                  <span class="text-gray-400">/</span>
                }
              }
            </nav>
          }

          <div class="flex-1"></div>

          <!-- Header actions slot -->
          <ng-content select="[header-actions]"></ng-content>

          <!-- User menu -->
          @if (userName) {
            <div class="flex items-center gap-3">
              @if (userAvatar) {
                <img [src]="userAvatar" [alt]="userName" class="w-8 h-8 rounded-full" />
              } @else {
                <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                  {{ userName.charAt(0).toUpperCase() }}
                </div>
              }
              <span class="hidden md:block text-sm font-medium">{{ userName }}</span>
              @if (showLogout) {
                <button
                  class="p-2 rounded-md hover:bg-gray-100 text-gray-500"
                  (click)="onLogout()"
                  aria-label="Logout"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clip-rule="evenodd" />
                  </svg>
                </button>
              }
            </div>
          }
        </header>

        <!-- Page content -->
        <main class="p-4 lg:p-6">
          <ng-content></ng-content>
        </main>

        <!-- Footer -->
        @if (showFooter) {
          <footer class="border-t border-gray-200 bg-white px-4 lg:px-6 py-4">
            <ng-content select="[dashboard-footer]"></ng-content>
          </footer>
        }
      </div>
    </div>
  `,
})
export class DashboardLayoutComponent {
  /** Application name (shown when no logo) */
  @Input() appName = 'Dashboard';

  /** Logo URL */
  @Input() logoUrl?: string;

  /** Logo alt text */
  @Input() logoAlt = 'Logo';

  /** Navigation items */
  @Input() navItems: DashboardNavItem[] = [];

  /** Breadcrumb items */
  @Input() breadcrumbs: BreadcrumbItem[] = [];

  /** User name for the header */
  @Input() userName?: string;

  /** User avatar URL */
  @Input() userAvatar?: string;

  /** Whether to show the logout button */
  @Input({ transform: booleanAttribute }) showLogout = true;

  /** Whether to show the footer */
  @Input({ transform: booleanAttribute }) showFooter = false;

  /** Whether to show the sidebar footer */
  @Input({ transform: booleanAttribute }) showSidebarFooter = false;

  /** Sidebar width when expanded */
  @Input() sidebarWidth = '16rem';

  /** Sidebar width when collapsed */
  @Input() sidebarCollapsedWidth = '4rem';

  /** Event emitted when a nav item is clicked */
  @Output() navItemClick = new EventEmitter<DashboardNavItem>();

  /** Event emitted when logout is clicked */
  @Output() logout = new EventEmitter<void>();

  /** Sidebar collapsed state (mobile) */
  readonly sidebarCollapsed = signal(true);

  /** Sidebar minimized state (desktop) */
  readonly sidebarMinimized = signal(false);

  /**
   * Get sidebar CSS classes
   */
  readonly sidebarClasses = computed(() => {
    const base = 'fixed top-0 left-0 h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-200 z-[100]';
    const width = this.sidebarMinimized() ? 'lg:w-16' : 'lg:w-64';
    const mobileHidden = this.sidebarCollapsed() ? '-translate-x-full lg:translate-x-0' : 'translate-x-0 w-64';
    return `${base} ${width} ${mobileHidden}`;
  });

  /**
   * Get main content area CSS classes
   */
  readonly mainContentClasses = computed(() => {
    const margin = this.sidebarMinimized() ? 'lg:ml-16' : 'lg:ml-64';
    return `min-h-screen flex flex-col transition-all duration-200 ${margin}`;
  });

  /**
   * Toggle mobile sidebar visibility
   */
  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  /**
   * Toggle desktop sidebar collapse state
   */
  toggleCollapse(): void {
    this.sidebarMinimized.update((v) => !v);
  }

  /**
   * Handle navigation item click
   */
  onNavItemClick(item: DashboardNavItem): void {
    if (!item.disabled) {
      this.navItemClick.emit(item);
      // Close mobile sidebar after click
      this.sidebarCollapsed.set(true);
    }
  }

  /**
   * Handle logout click
   */
  onLogout(): void {
    this.logout.emit();
  }

  /**
   * Get CSS classes for a navigation item
   */
  getNavItemClasses(item: DashboardNavItem): string {
    const base = 'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors';
    const active = item.active
      ? 'bg-primary-50 text-primary-600'
      : 'text-gray-700 hover:bg-gray-100';
    const disabled = item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    const collapsed = this.sidebarMinimized() ? 'justify-center' : '';
    return `${base} ${active} ${disabled} ${collapsed}`;
  }
}
