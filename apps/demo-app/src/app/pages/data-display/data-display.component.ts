/**
 * @flyfront/demo-app - Data Display Components Showcase
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent, SectionComponent, ShowcaseCardComponent, ComponentGridComponent } from '../../shared/showcase.component';
import {
  CardComponent,
  CardHeaderComponent,
  CardContentComponent,
  CardFooterComponent,
  BadgeComponent,
  AvatarComponent,
  TooltipDirective,
  DataTableComponent,
  TabsComponent,
  TabContentDirective,
  ButtonComponent,
} from '@flyfront/ui';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    SectionComponent,
    ShowcaseCardComponent,
    ComponentGridComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent,
    BadgeComponent,
    AvatarComponent,
    TooltipDirective,
    DataTableComponent,
    TabsComponent,
    TabContentDirective,
    ButtonComponent,
  ],
  template: `
    <app-page-header
      title="Data Display"
      description="Components for presenting and organizing information"
    />

    <!-- Cards -->
    <app-section title="Cards" description="Container components for grouping related content">
      <app-component-grid [columns]="3">
        <fly-card>
          <fly-card-header>
            <h3 class="font-semibold text-gray-900 dark:text-white">Simple Card</h3>
          </fly-card-header>
          <fly-card-content>
            <p class="text-gray-600 dark:text-gray-400">
              A basic card with header and content sections.
            </p>
          </fly-card-content>
        </fly-card>

        <fly-card>
          <fly-card-header>
            <h3 class="font-semibold text-gray-900 dark:text-white">Card with Footer</h3>
          </fly-card-header>
          <fly-card-content>
            <p class="text-gray-600 dark:text-gray-400">
              Cards can include action buttons in the footer.
            </p>
          </fly-card-content>
          <fly-card-footer>
            <fly-button variant="outline" size="sm">Cancel</fly-button>
            <fly-button variant="primary" size="sm">Save</fly-button>
          </fly-card-footer>
        </fly-card>

        <fly-card>
          <fly-card-header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-gray-900 dark:text-white">Status Card</h3>
              <fly-badge color="success">Active</fly-badge>
            </div>
          </fly-card-header>
          <fly-card-content>
            <p class="text-gray-600 dark:text-gray-400">
              Combine cards with badges and other components.
            </p>
          </fly-card-content>
        </fly-card>
      </app-component-grid>
    </app-section>

    <!-- Badges -->
    <app-section title="Badges" description="Small status indicators and labels">
      <app-showcase-card title="Solid Badges">
        <div class="flex flex-wrap items-center gap-3">
          <fly-badge color="primary">Primary</fly-badge>
          <fly-badge color="secondary">Secondary</fly-badge>
          <fly-badge color="success">Success</fly-badge>
          <fly-badge color="warning">Warning</fly-badge>
          <fly-badge color="error">Error</fly-badge>
          <fly-badge color="info">Info</fly-badge>
        </div>
      </app-showcase-card>
      <app-showcase-card title="Outline Badges">
        <div class="flex flex-wrap items-center gap-3 mt-4">
          <fly-badge color="primary" variant="outline">Primary</fly-badge>
          <fly-badge color="success" variant="outline">Success</fly-badge>
          <fly-badge color="error" variant="outline">Error</fly-badge>
        </div>
      </app-showcase-card>
      <app-showcase-card title="Subtle Badges">
        <div class="flex flex-wrap items-center gap-3 mt-4">
          <fly-badge color="primary" variant="subtle">Primary</fly-badge>
          <fly-badge color="success" variant="subtle">Success</fly-badge>
          <fly-badge color="warning" variant="subtle">Warning</fly-badge>
        </div>
      </app-showcase-card>
    </app-section>

    <!-- Avatars -->
    <app-section title="Avatars" description="User profile images and initials">
      <app-component-grid [columns]="2">
        <app-showcase-card title="Sizes">
          <div class="flex items-end gap-4">
            <fly-avatar size="xs" initials="XS" />
            <fly-avatar size="sm" initials="SM" />
            <fly-avatar size="md" initials="MD" />
            <fly-avatar size="lg" initials="LG" />
            <fly-avatar size="xl" initials="XL" />
          </div>
        </app-showcase-card>
        <app-showcase-card title="With Images">
          <div class="flex items-center gap-4">
            <fly-avatar 
              size="lg" 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
              alt="User"
            />
            <fly-avatar 
              size="lg" 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
              alt="User"
            />
            <fly-avatar size="lg" initials="JD" />
          </div>
        </app-showcase-card>
      </app-component-grid>
    </app-section>

    <!-- Avatar Groups -->
    <app-section title="Avatar Groups" description="Stacked avatars for teams">
      <app-showcase-card>
        <div class="flex items-center">
          <div class="flex -space-x-2">
            <fly-avatar 
              size="md" 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              class="ring-2 ring-white dark:ring-gray-900"
            />
            <fly-avatar 
              size="md" 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              class="ring-2 ring-white dark:ring-gray-900"
            />
            <fly-avatar 
              size="md" 
              initials="JD"
              class="ring-2 ring-white dark:ring-gray-900"
            />
            <fly-avatar 
              size="md" 
              initials="+3"
              class="ring-2 ring-white dark:ring-gray-900"
            />
          </div>
          <span class="ml-3 text-sm text-gray-600 dark:text-gray-400">6 team members</span>
        </div>
      </app-showcase-card>
    </app-section>

    <!-- Tooltips -->
    <app-section title="Tooltips" description="Contextual information on hover">
      <app-showcase-card>
        <div class="flex flex-wrap gap-4">
          <fly-button variant="outline" flyTooltip="This is a tooltip">Hover me</fly-button>
          <fly-button variant="outline" flyTooltip="Helpful information appears here" position="top">Top tooltip</fly-button>
          <fly-button variant="danger" flyTooltip="Action will delete this item" position="bottom">Delete</fly-button>
        </div>
      </app-showcase-card>
    </app-section>

    <!-- Tabs -->
    <app-section title="Tabs" description="Organize content into switchable panels">
      <app-showcase-card>
        <fly-tabs [tabs]="tabs" [activeTabId]="activeTab" (tabChange)="activeTab = $event">
          <ng-template flyTabContent="account">
            <div class="p-4">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">Account Settings</h4>
              <p class="text-gray-600 dark:text-gray-400">Manage your account preferences and profile information.</p>
            </div>
          </ng-template>
          <ng-template flyTabContent="security">
            <div class="p-4">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">Security</h4>
              <p class="text-gray-600 dark:text-gray-400">Configure password, two-factor authentication, and sessions.</p>
            </div>
          </ng-template>
          <ng-template flyTabContent="notifications">
            <div class="p-4">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">Notifications</h4>
              <p class="text-gray-600 dark:text-gray-400">Choose how you want to be notified about activity.</p>
            </div>
          </ng-template>
        </fly-tabs>
      </app-showcase-card>
    </app-section>

    <!-- Data Table -->
    <app-section title="Data Table" description="Tabular data display with sorting and pagination">
      <app-showcase-card>
        <fly-data-table [columns]="tableColumns" [data]="tableData" />
      </app-showcase-card>
    </app-section>
  `,
})
export class DataDisplayComponent {
  activeTab = 'account';
  
  readonly tabs = [
    { id: 'account', label: 'Account' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
  ];

  readonly tableColumns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status' },
  ];

  readonly tableData = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
    { name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  ];
}
