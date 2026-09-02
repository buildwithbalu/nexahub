import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../core/services/feedback.service';
import { ActivityService } from '../../core/services/activity.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="page-container narrow">
      <div class="page-title">
        <span class="eyebrow">SERVICE 02</span>
        <h1>Share your feedback.</h1>
        <p>Your feedback helps us understand what works and what needs improvement.</p>
      </div>

      @if (submitted) {
        <div class="success-card">
          <div class="success-icon">✓</div>
          <h2>Thanks for the feedback!</h2>
          <p>Your response has been recorded successfully.</p>
          <button class="btn btn-primary" (click)="reset()">Submit another response</button>
        </div>
      } @else {
        <form class="form-card" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <label>Service used</label>
          <select formControlName="service">
            <option value="">Select a service</option>
            <option>Calculator</option>
            <option>Dashboard</option>
            <option>Profile</option>
            <option>Other</option>
          </select>
          @if (form.controls.service.touched && form.controls.service.invalid) {
            <small class="error">Please select a service.</small>
          }

          <label>How would you rate it?</label>
          <div class="rating-row">
            @for (star of stars; track star) {
              <button type="button" [class.selected]="star <= form.controls.rating.value" (click)="setRating(star)">★</button>
            }
          </div>
          @if (form.controls.rating.touched && form.controls.rating.invalid) {
            <small class="error">Please choose a rating.</small>
          }

          <label>Tell us more</label>
          <textarea rows="6" formControlName="message" placeholder="What did you like? What could be better?"></textarea>
          <div class="field-meta">
            @if (form.controls.message.touched && form.controls.message.invalid) {
              <small class="error">Feedback must be at least 10 characters.</small>
            } @else {
              <small>Minimum 10 characters</small>
            }
            <small>{{ form.controls.message.value.length }}/500</small>
          </div>

          <button class="btn btn-primary" type="submit">Submit feedback →</button>
        </form>
      }

      @if (feedback.feedback().length > 0) {
        <section class="submitted-section">
          <div class="section-head"><div><span class="eyebrow">YOUR RESPONSES</span><h2>Previous feedback</h2></div></div>
          @for (item of feedback.feedback(); track item.id) {
            <article class="feedback-item">
              <div><strong>{{ item.service }}</strong><span>{{ '★'.repeat(item.rating) }}</span></div>
              <p>{{ item.message }}</p>
              <small>{{ item.createdAt }}</small>
            </article>
          }
        </section>
      }
    </div>
  `
})
export class FeedbackComponent {
  private readonly fb = inject(FormBuilder);
  readonly feedback = inject(FeedbackService);
  private readonly activity = inject(ActivityService);

  submitted = false;
  stars = [1, 2, 3, 4, 5];

  readonly form = this.fb.nonNullable.group({
    service: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
  });

  setRating(value: number): void {
    this.form.controls.rating.setValue(value);
    this.form.controls.rating.markAsTouched();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();

    this.feedback.add(values);
    this.activity.add('Feedback', 'Feedback submitted', `${values.service} • ${values.rating}/5 stars`);
    this.submitted = true;
  }

  reset(): void {
    this.form.reset({ service: '', rating: 0, message: '' });
    this.submitted = false;
  }
}
