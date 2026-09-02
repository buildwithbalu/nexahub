import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/models';

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return password === confirm ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="auth-page">
      <div class="auth-panel register-panel">
        <a routerLink="/home" class="auth-brand">← NexaHub</a>
        <div class="auth-heading">
          <span class="eyebrow">GET STARTED</span>
          <h1>Create your account.</h1>
          <p>Set up your personal NexaHub workspace.</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <label>Full name</label>
          <input type="text" formControlName="name" placeholder="Alex Kumar">
          @if (form.controls.name.touched && form.controls.name.invalid) {
            <small class="error">Name must be at least 2 characters.</small>
          }

          <label>Email</label>
          <input type="email" formControlName="email" placeholder="you@example.com">
          @if (form.controls.email.touched && form.controls.email.invalid) {
            <small class="error">Enter a valid email address.</small>
          }

          <div class="two-col">
            <div>
              <label>Password</label>
              <input type="password" formControlName="password" placeholder="Min. 6 characters">
            </div>
            <div>
              <label>Confirm password</label>
              <input type="password" formControlName="confirmPassword" placeholder="Repeat password">
            </div>
          </div>

          @if (form.touched && form.hasError('mismatch')) {
            <small class="error">Passwords do not match.</small>
          }

          @if (error) {
            <div class="alert error-box">{{ error }}</div>
          }

          <button class="btn btn-primary full" type="submit">Create account</button>
        </form>

        <p class="auth-switch">Already registered? <a routerLink="/login">Sign in</a></p>
      </div>
    </section>
  `
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  error = '';

  readonly form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: passwordsMatch }
  );

  submit(): void {
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();

    const user: User = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      createdAt: new Date().toISOString()
    };

    this.auth.register(user);
    this.auth.login(user.email, user.password);
    this.router.navigate(['/dashboard']);
  }
}
