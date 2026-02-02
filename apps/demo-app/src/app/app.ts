/**
 * @flyfront/demo-app - app
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [NxWelcome, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'flyfront';
}
