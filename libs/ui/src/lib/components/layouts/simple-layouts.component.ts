/**
 * @flyfront/ui - Simple Layout Components
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 *
 * A collection of simple, reusable layout components:
 * - CenteredLayout: Centers content both horizontally and vertically
 * - SplitLayout: Two-column layout with configurable ratios
 * - StackLayout: Vertical stacking with configurable gaps
 * - PageLayout: Standard page wrapper with header and actions
 */

import {
  Component,
  Input,
  ChangeDetectionStrategy,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// ============================================================================
// CENTERED LAYOUT
// ============================================================================

/**
 * Centered layout component
 *
 * @description
 * Centers content horizontally and optionally vertically within a container.
 * Useful for empty states, loading screens, and simple centered content.
 *
 * @example
 * ```html
 * <fly-centered-layout [fullHeight]="true" maxWidth="md">
 *   <div class="text-center">
 *     <h1>Welcome!</h1>
 *     <p>This content is centered.</p>
 *   </div>
 * </fly-centered-layout>
 * ```
 */
@Component({
  selector: 'fly-centered-layout',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses">
      <div [class]="contentClasses">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class CenteredLayoutComponent {
  /** Maximum width of the centered content */
  @Input() maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' = 'lg';

  /** Whether to use full viewport height and center vertically */
  @Input({ transform: booleanAttribute }) fullHeight = false;

  /** Padding around the content */
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

  /** Background color class */
  @Input() background = '';

  private readonly maxWidthClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  private readonly paddingClasses: Record<string, string> = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  /**
   * Get container CSS classes
   */
  get containerClasses(): string {
    const height = this.fullHeight ? 'min-h-screen' : '';
    const flex = this.fullHeight ? 'flex items-center justify-center' : '';
    return `${height} ${flex} ${this.paddingClasses[this.padding]} ${this.background}`.trim();
  }

  /**
   * Get content wrapper CSS classes
   */
  get contentClasses(): string {
    return `w-full mx-auto ${this.maxWidthClasses[this.maxWidth]}`;
  }
}

// ============================================================================
// SPLIT LAYOUT
// ============================================================================

/**
 * Split layout component
 *
 * @description
 * Creates a two-column layout with configurable split ratios.
 * Automatically stacks on mobile devices.
 *
 * @example
 * ```html
 * <fly-split-layout split="60-40" gap="lg">
 *   <div left>
 *     <h1>Main Content</h1>
 *   </div>
 *   <div right>
 *     <aside>Sidebar</aside>
 *   </div>
 * </fly-split-layout>
 * ```
 */
@Component({
  selector: 'fly-split-layout',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses">
      <div [class]="leftClasses">
        <ng-content select="[left]"></ng-content>
      </div>
      <div [class]="rightClasses">
        <ng-content select="[right]"></ng-content>
      </div>
    </div>
  `,
})
export class SplitLayoutComponent {
  /** Split ratio between left and right columns */
  @Input() split: '50-50' | '60-40' | '40-60' | '70-30' | '30-70' | '75-25' | '25-75' = '50-50';

  /** Gap between columns */
  @Input() gap: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Whether to reverse the order on mobile (right column first) */
  @Input({ transform: booleanAttribute }) reverseOnMobile = false;

  /** Breakpoint at which to stack columns */
  @Input() stackAt: 'sm' | 'md' | 'lg' = 'md';

  /** Minimum height */
  @Input() minHeight?: string;

  private readonly gapClasses: Record<string, string> = {
    none: 'gap-0',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  private readonly splitClasses: Record<string, { left: string; right: string }> = {
    '50-50': { left: 'lg:w-1/2', right: 'lg:w-1/2' },
    '60-40': { left: 'lg:w-3/5', right: 'lg:w-2/5' },
    '40-60': { left: 'lg:w-2/5', right: 'lg:w-3/5' },
    '70-30': { left: 'lg:w-[70%]', right: 'lg:w-[30%]' },
    '30-70': { left: 'lg:w-[30%]', right: 'lg:w-[70%]' },
    '75-25': { left: 'lg:w-3/4', right: 'lg:w-1/4' },
    '25-75': { left: 'lg:w-1/4', right: 'lg:w-3/4' },
  };

  /**
   * Get container CSS classes
   */
  get containerClasses(): string {
    const base = 'flex flex-col lg:flex-row';
    const reverse = this.reverseOnMobile ? 'flex-col-reverse lg:flex-row' : '';
    const minH = this.minHeight ? `min-h-[${this.minHeight}]` : '';
    return `${base} ${reverse} ${this.gapClasses[this.gap]} ${minH}`.trim();
  }

  /**
   * Get left column CSS classes
   */
  get leftClasses(): string {
    return `w-full ${this.splitClasses[this.split].left}`;
  }

  /**
   * Get right column CSS classes
   */
  get rightClasses(): string {
    return `w-full ${this.splitClasses[this.split].right}`;
  }
}

// ============================================================================
// STACK LAYOUT
// ============================================================================

/**
 * Stack layout component
 *
 * @description
 * Vertically stacks child elements with consistent spacing.
 * Useful for forms, lists, and sequential content.
 *
 * @example
 * ```html
 * <fly-stack-layout gap="lg" [dividers]="true">
 *   <section>Section 1</section>
 *   <section>Section 2</section>
 *   <section>Section 3</section>
 * </fly-stack-layout>
 * ```
 */
@Component({
  selector: 'fly-stack-layout',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host ::ng-deep > div > * + * {
      margin-top: var(--stack-gap);
    }
    :host([dividers="true"]) ::ng-deep > div > * + *::before {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: rgb(229 231 235);
      margin-bottom: var(--stack-gap);
    }
  `],
})
export class StackLayoutComponent {
  /** Gap between stacked items */
  @Input() gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Whether to show dividers between items */
  @Input({ transform: booleanAttribute }) dividers = false;

  /** Alignment of items */
  @Input() align: 'stretch' | 'start' | 'center' | 'end' = 'stretch';

  /** Maximum width of the stack */
  @Input() maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  private readonly gapValues: Record<string, string> = {
    none: '0',
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  };

  private readonly alignClasses: Record<string, string> = {
    stretch: 'items-stretch',
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  };

  private readonly maxWidthClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  /**
   * Get container CSS classes
   */
  get containerClasses(): string {
    const base = 'flex flex-col';
    const align = this.alignClasses[this.align];
    const maxW = this.maxWidth ? this.maxWidthClasses[this.maxWidth] : '';
    return `${base} ${align} ${maxW}`.trim();
  }
}

// ============================================================================
// PAGE LAYOUT
// ============================================================================

/**
 * Page layout component
 *
 * @description
 * A standard page wrapper with page header (title, description, actions)
 * and content area. Commonly used as the base layout for feature pages.
 *
 * @example
 * ```html
 * <fly-page-layout
 *   title="Users"
 *   description="Manage your team members and their permissions."
 * >
 *   <ng-container page-actions>
 *     <fly-button variant="primary">Add User</fly-button>
 *   </ng-container>
 *
 *   <!-- Page content -->
 *   <fly-data-table [data]="users" />
 * </fly-page-layout>
 * ```
 */
@Component({
  selector: 'fly-page-layout',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses">
      <!-- Page header -->
      @if (title || showHeader) {
        <header [class]="headerClasses">
          <div class="flex-1 min-w-0">
            @if (title) {
              <h1 class="text-2xl font-bold text-gray-900 truncate">{{ title }}</h1>
            }
            @if (description) {
              <p class="mt-1 text-sm text-gray-500">{{ description }}</p>
            }
            <ng-content select="[page-header-content]"></ng-content>
          </div>
          <div class="flex items-center gap-3 flex-shrink-0">
            <ng-content select="[page-actions]"></ng-content>
          </div>
        </header>
      }

      <!-- Page content -->
      <div [class]="contentClasses">
        <ng-content></ng-content>
      </div>

      <!-- Page footer -->
      @if (showFooter) {
        <footer class="mt-auto pt-6 border-t border-gray-200">
          <ng-content select="[page-footer]"></ng-content>
        </footer>
      }
    </div>
  `,
})
export class PageLayoutComponent {
  /** Page title */
  @Input() title?: string;

  /** Page description */
  @Input() description?: string;

  /** Whether to always show the header (even without title) */
  @Input({ transform: booleanAttribute }) showHeader = false;

  /** Whether to show the footer slot */
  @Input({ transform: booleanAttribute }) showFooter = false;

  /** Maximum width of the page content */
  @Input() maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full' = 'full';

  /** Padding around the content */
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'none';

  /** Whether the header should be sticky */
  @Input({ transform: booleanAttribute }) stickyHeader = false;

  private readonly maxWidthClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  private readonly paddingClasses: Record<string, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  /**
   * Get container CSS classes
   */
  get containerClasses(): string {
    const maxW = this.maxWidthClasses[this.maxWidth];
    const pad = this.paddingClasses[this.padding];
    return `w-full mx-auto flex flex-col min-h-full ${maxW} ${pad}`.trim();
  }

  /**
   * Get header CSS classes
   */
  get headerClasses(): string {
    const base = 'flex items-start justify-between gap-4 mb-6';
    const sticky = this.stickyHeader ? 'sticky top-0 bg-white z-10 py-4 -mx-4 px-4' : '';
    return `${base} ${sticky}`.trim();
  }

  /**
   * Get content CSS classes
   */
  get contentClasses(): string {
    return 'flex-1';
  }
}
