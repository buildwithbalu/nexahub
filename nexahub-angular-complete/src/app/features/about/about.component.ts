import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="page-container narrow">
      <div class="page-title">
        <span class="eyebrow">ABOUT NEXAHUB</span>
        <h1>Built to demonstrate Angular in a useful way.</h1>
        <p>NexaHub is a student service portal combining authentication and multiple services under one interface.</p>
      </div>

      <section class="about-grid">
        <article><span>01</span><h3>Authentication</h3><p>Registration, login, logout and protected routes using an Angular authentication service and route guard.</p></article>
        <article><span>02</span><h3>Reactive Forms</h3><p>Login, registration and feedback use Angular Reactive Forms with validation and clear error states.</p></article>
        <article><span>03</span><h3>Services</h3><p>Application logic is separated into reusable Angular services for authentication, calculator, feedback and activity.</p></article>
      </section>
    </div>
  `
})
export class AboutComponent {}
