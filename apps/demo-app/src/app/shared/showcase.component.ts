/**
 * @flyfront/demo-app - Showcase Components
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 */

import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ title }}</h1>
      @if (description) {
        <p class="text-lg text-gray-600 dark:text-gray-400">{{ description }}</p>
      }
    </div>
  `,
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() description = '';
}

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="mb-10">
      <div class="mb-4">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ title }}</h2>
        @if (description) {
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ description }}</p>
        }
      </div>
      <ng-content />
    </section>
  `,
})
export class SectionComponent {
  @Input() title = '';
  @Input() description = '';
}

@Component({
  selector: 'app-showcase-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="showcase-card">
      @if (title) {
        <div class="showcase-card-header">
          <h3 class="showcase-card-title">{{ title }}</h3>
          @if (subtitle) {
            <p class="showcase-card-subtitle">{{ subtitle }}</p>
          }
        </div>
      }
      <div class="showcase-card-body" [class.with-bg]="showBackground">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    .showcase-card {
      background: white;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    :host-context(.dark) .showcase-card,
    .dark .showcase-card {
      background: #1f2937;
      border-color: #374151;
    }
    .showcase-card-header {
      padding: 16px 24px;
      border-bottom: 1px solid #e5e7eb;
    }
    :host-context(.dark) .showcase-card-header,
    .dark .showcase-card-header {
      border-color: #374151;
    }
    .showcase-card-title {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }
    :host-context(.dark) .showcase-card-title,
    .dark .showcase-card-title {
      color: white;
    }
    .showcase-card-subtitle {
      margin: 4px 0 0;
      font-size: 13px;
      color: #6b7280;
    }
    .showcase-card-body {
      padding: 24px;
      flex: 1;
    }
    .showcase-card-body.with-bg {
      background: #f9fafb;
    }
    :host-context(.dark) .showcase-card-body.with-bg,
    .dark .showcase-card-body.with-bg {
      background: #111827;
    }
  `]
})
export class ShowcaseCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() showBackground = false;
}

@Component({
  selector: 'app-component-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-grid" [style.--grid-columns]="columns">
      <ng-content />
    </div>
  `,
  styles: [`
    .component-grid {
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr;
    }
    @media (min-width: 768px) {
      .component-grid {
        grid-template-columns: repeat(var(--grid-columns, 2), 1fr);
      }
    }
    .component-grid > * {
      min-width: 0;
    }
  `]
})
export class ComponentGridComponent {
  @Input() columns = 2;
}

@Component({
  selector: 'app-prop-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Property</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Type</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Default</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Description</th>
          </tr>
        </thead>
        <tbody>
          @for (prop of props; track prop.name) {
            <tr class="border-b border-gray-100 dark:border-gray-800">
              <td class="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">{{ prop.name }}</td>
              <td class="py-3 px-4 font-mono text-xs text-gray-600 dark:text-gray-400">{{ prop.type }}</td>
              <td class="py-3 px-4 font-mono text-xs text-gray-500 dark:text-gray-500">{{ prop.default || '-' }}</td>
              <td class="py-3 px-4 text-gray-700 dark:text-gray-300">{{ prop.description }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class PropTableComponent {
  @Input() props: { name: string; type: string; default?: string; description: string }[] = [];
}

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-block-container">
      <!-- Header -->
      <div class="code-header">
        <div class="code-header-left">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-green"></span>
          @if (title) {
            <span class="code-title">{{ title }}</span>
          }
        </div>
        <button class="copy-btn" (click)="copyCode()" [title]="copied ? 'Copied!' : 'Copy code'">
          @if (copied) {
            <svg width="16" height="16" fill="none" stroke="#4ade80" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          } @else {
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
        </button>
      </div>
      <!-- Code with line numbers -->
      <div class="code-body">
        <div class="line-numbers">
          @for (line of codeLines; track $index) {
            <span class="line-number">{{ $index + 1 }}</span>
          }
        </div>
        <pre class="code-pre"><code [innerHTML]="highlightedCode"></code></pre>
      </div>
    </div>
  `,
  styles: [`
    .code-block-container {
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #374151;
      background: #0d1117;
    }
    .code-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: #161b22;
      border-bottom: 1px solid #30363d;
    }
    .code-header-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .dot-red { background: #ff5f56; }
    .dot-yellow { background: #ffbd2e; }
    .dot-green { background: #27c93f; }
    .code-title {
      margin-left: 12px;
      font-size: 13px;
      color: #8b949e;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
    }
    .copy-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 6px;
      color: #8b949e;
      display: flex;
      align-items: center;
      transition: all 0.15s;
    }
    .copy-btn:hover {
      background: #30363d;
      color: #e6edf3;
    }
    .code-body {
      display: flex;
      overflow-x: auto;
    }
    .line-numbers {
      display: flex;
      flex-direction: column;
      padding: 16px 0;
      background: #0d1117;
      border-right: 1px solid #21262d;
      user-select: none;
      flex-shrink: 0;
    }
    .line-number {
      padding: 0 12px 0 16px;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 13px;
      line-height: 1.5;
      color: #484f58;
      text-align: right;
      min-width: 32px;
    }
    .code-pre {
      margin: 0;
      padding: 16px;
      overflow-x: auto;
      background: #0d1117;
      flex: 1;
    }
    .code-pre code {
      font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
      font-size: 13px;
      line-height: 1.5;
      color: #e6edf3;
      white-space: pre;
      display: block;
    }
    /* Prism.js token styles - GitHub Dark theme */
    .code-pre :global(.token.comment),
    .code-pre :global(.token.prolog),
    .code-pre :global(.token.doctype),
    .code-pre :global(.token.cdata) {
      color: #8b949e;
      font-style: italic;
    }
    .code-pre :global(.token.punctuation) {
      color: #e6edf3;
    }
    .code-pre :global(.token.property),
    .code-pre :global(.token.tag),
    .code-pre :global(.token.boolean),
    .code-pre :global(.token.number),
    .code-pre :global(.token.constant),
    .code-pre :global(.token.symbol),
    .code-pre :global(.token.deleted) {
      color: #79c0ff;
    }
    .code-pre :global(.token.selector),
    .code-pre :global(.token.attr-name),
    .code-pre :global(.token.string),
    .code-pre :global(.token.char),
    .code-pre :global(.token.builtin),
    .code-pre :global(.token.inserted) {
      color: #a5d6ff;
    }
    .code-pre :global(.token.operator),
    .code-pre :global(.token.entity),
    .code-pre :global(.token.url) {
      color: #e6edf3;
    }
    .code-pre :global(.token.atrule),
    .code-pre :global(.token.attr-value),
    .code-pre :global(.token.keyword) {
      color: #ff7b72;
    }
    .code-pre :global(.token.function),
    .code-pre :global(.token.class-name) {
      color: #d2a8ff;
    }
    .code-pre :global(.token.regex),
    .code-pre :global(.token.important),
    .code-pre :global(.token.variable) {
      color: #ffa657;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class CodeBlockComponent implements OnChanges {
  @Input() code = '';
  @Input() title = '';
  @Input() language = 'typescript';
  copied = false;
  highlightedCode = '';

  get codeLines(): string[] {
    return this.code.split('\n');
  }

  ngOnChanges(): void {
    this.highlight();
  }

  private highlight(): void {
    if (!this.code) {
      this.highlightedCode = '';
      return;
    }

    // Detect language from content or use specified
    let lang = this.language;
    if (this.code.includes('<fly-') || this.code.includes('<ng-') || this.code.includes('</')) {
      lang = 'markup';
    }

    // Use Prism for highlighting
    const grammar = Prism.languages[lang] || Prism.languages['markup'];
    this.highlightedCode = Prism.highlight(this.code, grammar, lang);
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.code);
    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }
}
