/**
 * @flyfront/demo-app - app
 * @license Apache-2.0
 * @copyright 2026 Firefly Software Solutions Inc.
 */

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Flyfront Demo App';
}
