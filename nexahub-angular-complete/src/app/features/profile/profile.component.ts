import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivityService } from '../../core/services/activity.service';
import { FeedbackService } from '../../core/services/feedback.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="page-container narrow">
      <div class="page-title">
        <span class="eyebrow">ACCOUNT</span>
        <h1>Your profile</h1>
        <p>Your NexaHub account information.</p>
      </div>

      <section class="profile-card">
        <div class="profile-hero">
          <div class="profile-avatar">{{ initial }}</div>
          <div><h2>{{ auth.currentUser()?.name }}</h2><p>{{ auth.currentUser()?.email }}</p></div>
        </div>

        <div class="profile-stats">
          <div><strong>{{ activities.activities().length }}</strong><span>Activities</span></div>
          <div><strong>{{ feedback.feedback().length }}</strong><span>Feedback</span></div>
          <div><strong>Active</strong><span>Account status</span></div>
        </div>

        <div class="details-grid">
          <div><span>Full name</span><strong>{{ auth.currentUser()?.name }}</strong></div>
          <div><span>Email</span><strong>{{ auth.currentUser()?.email }}</strong></div>
          <div><span>Member since</span><strong>{{ memberSince }}</strong></div>
          <div><span>Account type</span><strong>Student</strong></div>
        </div>
      </section>
    </div>
  `
})
export class ProfileComponent {
  readonly auth = inject(AuthService);
  readonly activities = inject(ActivityService);
  readonly feedback = inject(FeedbackService);

  get initial(): string {
    return this.auth.currentUser()?.name?.charAt(0).toUpperCase() || 'U';
  }

  get memberSince(): string {
    const date = this.auth.currentUser()?.createdAt;
    return date ? new Date(date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : '—';
  }
}
