import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="auth-page">
      <div class="auth-panel">
        <a routerLink="/home" class="auth-brand">← NexaHub</a>
        <div class="auth-heading">
          <span class="eyebrow">WELCOME BACK</span>
          <h1>Sign in to your workspace.</h1>
          <p>Access your services, activity and profile.</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <label>Email</label>
          <input type="email" formControlName="email" placeholder="you@example.com">
          @if (form.controls.email.touched && form.controls.email.invalid) {
            <small class="error">Enter a valid email address.</small>
          }

          <label>Password</label>
          <input type="password" formControlName="password" placeholder="Enter your password">
          @if (form.controls.password.touched && form.controls.password.invalid) {
            <small class="error">Password is required.</small>
          }

          @if (error) {
            <div class="alert error-box">{{ error }}</div>
          }

          <button class="btn btn-primary full" type="submit">Sign in</button>
        </form>

        <p class="auth-switch">New to NexaHub? <a routerLink="/register">Create an account</a></p>
      </div>
    </section>
  `
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  error = '';

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit(): void {
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    if (this.auth.login(email, password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid email or password. Register first if you do not have an account.';
    }
  }
}
