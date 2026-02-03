/**
 * @flyfront/demo-app - Home Page
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 */

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  InputComponent,
  CardComponent,
  CardHeaderComponent,
  CardContentComponent,
  CardFooterComponent,
  AlertComponent,
  BadgeComponent,
  SwitchComponent,
  CheckboxComponent,
  ProgressBarComponent,
  PageLayoutComponent,
  StackLayoutComponent,
  SplitLayoutComponent,
} from '@flyfront/ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent,
    AlertComponent,
    BadgeComponent,
    SwitchComponent,
    CheckboxComponent,
    ProgressBarComponent,
    PageLayoutComponent,
    StackLayoutComponent,
    SplitLayoutComponent,
  ],
  template: `
    <fly-page-layout
      title="Flyfront Component Library"
      description="Showcase of the @flyfront/ui design system components"
    >
      <ng-container page-actions>
        <fly-button variant="outline" (clicked)="toggleDarkMode()">
          {{ darkMode() ? '☀️ Light' : '🌙 Dark' }}
        </fly-button>
        <fly-button variant="primary">
          Get Started
        </fly-button>
      </ng-container>

      <fly-stack-layout gap="xl">
        <!-- Alerts Section -->
        <section>
          <h2 class="text-xl font-semibold mb-4">Alerts</h2>
          <fly-stack-layout gap="sm">
            <fly-alert type="info" title="Information">
              This is an informational alert message.
            </fly-alert>
            <fly-alert type="success" title="Success">
              Your changes have been saved successfully.
            </fly-alert>
            <fly-alert type="warning" title="Warning">
              Please review your input before continuing.
            </fly-alert>
            <fly-alert type="error" title="Error">
              An error occurred while processing your request.
            </fly-alert>
          </fly-stack-layout>
        </section>

        <!-- Buttons Section -->
        <section>
          <h2 class="text-xl font-semibold mb-4">Buttons</h2>
          <fly-split-layout split="50-50" gap="lg">
            <div left>
              <h3 class="text-lg font-medium mb-3">Variants</h3>
              <div class="flex flex-wrap gap-3">
                <fly-button variant="primary">Primary</fly-button>
                <fly-button variant="secondary">Secondary</fly-button>
                <fly-button variant="outline">Outline</fly-button>
                <fly-button variant="ghost">Ghost</fly-button>
                <fly-button variant="danger">Danger</fly-button>
                <fly-button variant="success">Success</fly-button>
              </div>
            </div>
            <div right>
              <h3 class="text-lg font-medium mb-3">Sizes</h3>
              <div class="flex flex-wrap items-center gap-3">
                <fly-button variant="primary" size="xs">Extra Small</fly-button>
                <fly-button variant="primary" size="sm">Small</fly-button>
                <fly-button variant="primary" size="md">Medium</fly-button>
                <fly-button variant="primary" size="lg">Large</fly-button>
                <fly-button variant="primary" size="xl">Extra Large</fly-button>
              </div>
            </div>
          </fly-split-layout>
          <div class="mt-4">
            <h3 class="text-lg font-medium mb-3">States</h3>
            <div class="flex flex-wrap gap-3">
              <fly-button variant="primary" [loading]="true">Loading</fly-button>
              <fly-button variant="primary" [disabled]="true">Disabled</fly-button>
              <fly-button variant="primary" [fullWidth]="false">Normal Width</fly-button>
            </div>
          </div>
        </section>

        <!-- Form Inputs Section -->
        <section>
          <h2 class="text-xl font-semibold mb-4">Form Inputs</h2>
          <fly-split-layout split="50-50" gap="lg">
            <div left>
              <fly-stack-layout gap="md">
                <fly-input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  hint="We'll never share your email"
                />
                <fly-input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
                <fly-input
                  label="With Error"
                  type="text"
                  placeholder="Invalid input"
                  error="This field is required"
                />
              </fly-stack-layout>
            </div>
            <div right>
              <fly-stack-layout gap="md">
                <fly-input
                  label="Search"
                  type="search"
                  placeholder="Search..."
                  [clearable]="true"
                />
                <fly-input
                  label="Disabled Input"
                  type="text"
                  placeholder="Cannot edit"
                  [disabled]="true"
                />
                <fly-input
                  label="Read Only"
                  type="text"
                  placeholder="Read only value"
                  [readonly]="true"
                />
              </fly-stack-layout>
            </div>
          </fly-split-layout>
        </section>

        <!-- Toggle Controls -->
        <section>
          <h2 class="text-xl font-semibold mb-4">Toggle Controls</h2>
          <div class="flex flex-wrap gap-8">
            <div>
              <h3 class="text-lg font-medium mb-3">Switches</h3>
              <fly-stack-layout gap="sm">
                <fly-switch label="Enable notifications" />
                <fly-switch label="Dark mode" (checkedChange)="onDarkModeChange($event)" />
                <fly-switch label="Disabled switch" [disabled]="true" />
              </fly-stack-layout>
            </div>
            <div>
              <h3 class="text-lg font-medium mb-3">Checkboxes</h3>
              <fly-stack-layout gap="sm">
                <fly-checkbox label="Accept terms and conditions" />
                <fly-checkbox label="Subscribe to newsletter" />
                <fly-checkbox label="Disabled checkbox" [disabled]="true" />
              </fly-stack-layout>
            </div>
          </div>
        </section>

        <!-- Progress -->
        <section>
          <h2 class="text-xl font-semibold mb-4">Progress Indicators</h2>
          <fly-stack-layout gap="md">
            <div>
              <p class="text-sm text-gray-600 mb-2">25% Complete</p>
              <fly-progress-bar [value]="25" />
            </div>
            <div>
              <p class="text-sm text-gray-600 mb-2">50% Complete</p>
              <fly-progress-bar [value]="50" />
            </div>
            <div>
              <p class="text-sm text-gray-600 mb-2">75% Complete</p>
              <fly-progress-bar [value]="75" />
            </div>
            <div>
              <p class="text-sm text-gray-600 mb-2">100% Complete</p>
              <fly-progress-bar [value]="100" />
            </div>
          </fly-stack-layout>
        </section>

        <!-- Cards Section -->
        <section>
          <h2 class="text-xl font-semibold mb-4">Cards</h2>
          <fly-split-layout split="50-50" gap="lg">
            <div left>
              <fly-card>
                <fly-card-header>
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold">Basic Card</h3>
                    <fly-badge color="primary">New</fly-badge>
                  </div>
                </fly-card-header>
                <fly-card-content>
                  <p class="text-gray-600">
                    This is a basic card with header, content, and footer sections.
                    Cards are great for grouping related content.
                  </p>
                </fly-card-content>
                <fly-card-footer>
                  <fly-button variant="ghost" size="sm">Cancel</fly-button>
                  <fly-button variant="primary" size="sm">Save</fly-button>
                </fly-card-footer>
              </fly-card>
            </div>
            <div right>
              <fly-card [elevated]="true" [interactive]="true">
                <fly-card-header>
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold">Elevated Card</h3>
                    <fly-badge color="success">Active</fly-badge>
                  </div>
                </fly-card-header>
                <fly-card-content>
                  <p class="text-gray-600">
                    This card has elevated styling with a shadow and interactive
                    hover effects. Hover over it to see the effect.
                  </p>
                </fly-card-content>
                <fly-card-footer>
                  <fly-button variant="outline" size="sm">Learn More</fly-button>
                </fly-card-footer>
              </fly-card>
            </div>
          </fly-split-layout>
        </section>

        <!-- Badges Section -->
        <section>
          <h2 class="text-xl font-semibold mb-4">Badges</h2>
          <div class="flex flex-wrap gap-3">
            <fly-badge color="primary">Primary</fly-badge>
            <fly-badge color="secondary">Secondary</fly-badge>
            <fly-badge color="success">Success</fly-badge>
            <fly-badge color="warning">Warning</fly-badge>
            <fly-badge color="error">Error</fly-badge>
            <fly-badge color="info">Info</fly-badge>
          </div>
        </section>
      </fly-stack-layout>
    </fly-page-layout>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem;
      background: linear-gradient(to bottom right, #f9fafb, #f3f4f6);
      min-height: 100vh;
    }

    section {
      background: white;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  `],
})
export class HomeComponent {
  darkMode = signal(false);

  toggleDarkMode() {
    this.darkMode.update(v => !v);
    document.documentElement.classList.toggle('dark');
  }

  onDarkModeChange(checked: boolean) {
    this.darkMode.set(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
