import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <span class="big-404">404</span>
      <h1>Page not found.</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a routerLink="/home" class="btn btn-primary">Back to home</a>
    </section>
  `
})
export class NotFoundComponent {}
