/**
 * @flyfront/ui - Auth Layout Component
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 *
 * A centered layout designed for authentication pages (login, register, forgot password).
 * Features a centered card with optional logo, background pattern, and footer.
 */

import {
  Component,
  Input,
  ChangeDetectionStrategy,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Auth layout component for authentication pages
 *
 * @description
 * Provides a centered, responsive layout perfect for login, registration,
 * password reset, and other authentication-related pages.
 *
 * @example
 * ```html
 * <fly-auth-layout
 *   logoUrl="/assets/logo.svg"
 *   logoAlt="My App"
 *   [showFooter]="true"
 * >
 *   <fly-card>
 *     <h1>Sign In</h1>
 *     <!-- Login form -->
 *   </fly-card>
 * </fly-auth-layout>
 * ```
 */
@Component({
  selector: 'fly-auth-layout',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClasses">
      <!-- Background pattern -->
      @if (showPattern) {
        <div class="absolute inset-0 opacity-5 pointer-events-none">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="auth-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#auth-pattern)" />
          </svg>
        </div>
      }

      <!-- Main content area -->
      <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <!-- Logo -->
        @if (logoUrl) {
          <div class="mb-8">
            <img
              [src]="logoUrl"
              [alt]="logoAlt"
              class="h-12 w-auto"
            />
          </div>
        }

        <!-- Title -->
        @if (title) {
          <h1 class="text-2xl font-bold text-gray-900 mb-2 text-center">{{ title }}</h1>
        }

        <!-- Subtitle -->
        @if (subtitle) {
          <p class="text-gray-600 mb-8 text-center max-w-md">{{ subtitle }}</p>
        }

        <!-- Content slot -->
        <div [class]="contentClasses">
          <ng-content></ng-content>
        </div>

        <!-- Footer links -->
        @if (showFooter) {
          <div class="mt-8 text-center text-sm text-gray-500">
            <ng-content select="[auth-footer]"></ng-content>
          </div>
        }
      </div>

      <!-- Footer -->
      @if (copyrightText) {
        <footer class="absolute bottom-0 left-0 right-0 py-4 text-center text-sm text-gray-400">
          {{ copyrightText }}
        </footer>
      }
    </div>
  `,
})
export class AuthLayoutComponent {
  /** URL for the logo image */
  @Input() logoUrl?: string;

  /** Alt text for the logo */
  @Input() logoAlt = 'Logo';

  /** Page title */
  @Input() title?: string;

  /** Page subtitle */
  @Input() subtitle?: string;

  /** Maximum width of the content area */
  @Input() maxWidth: 'sm' | 'md' | 'lg' = 'sm';

  /** Whether to show the background pattern */
  @Input({ transform: booleanAttribute }) showPattern = true;

  /** Whether to show the footer slot */
  @Input({ transform: booleanAttribute }) showFooter = true;

  /** Copyright text for the bottom footer */
  @Input() copyrightText?: string;

  /** Background color/gradient class */
  @Input() background = 'bg-gradient-to-br from-gray-50 to-gray-100';

  /**
   * Get container CSS classes
   */
  get containerClasses(): string {
    return `relative min-h-screen ${this.background}`;
  }

  /**
   * Get content area CSS classes based on maxWidth
   */
  get contentClasses(): string {
    const widthClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
    };
    return `w-full ${widthClasses[this.maxWidth]}`;
  }
}
