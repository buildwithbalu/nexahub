import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="landing">
      <div class="landing-copy">
        <div class="eyebrow">STUDENT SERVICE PORTAL</div>
        <h1>One place for the tools you use every day.</h1>
        <p>
          NexaHub brings useful student services into one simple Angular-powered workspace.
          Calculate, share feedback, and keep track of your activity.
        </p>
        <div class="hero-actions">
          <a routerLink="/register" class="btn btn-primary">Create account →</a>
          <a routerLink="/login" class="btn btn-secondary">I already have an account</a>
        </div>
      </div>


    <section class="feature-strip">
      <article><span>01</span><h3>Simple</h3><p>Clean navigation and focused services.</p></article>
      <article><span>02</span><h3>Connected</h3><p>Your activities stay together in one portal.</p></article>
      <article><span>03</span><h3>Responsive</h3><p>Designed to work across desktop and mobile.</p></article>
    </section>
  `
})
export class HomeComponent {}
