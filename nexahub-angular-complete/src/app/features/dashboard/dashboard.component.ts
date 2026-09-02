import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ActivityService } from '../../core/services/activity.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-container">
      <section class="welcome-card">
        <div>
          <span class="eyebrow">YOUR WORKSPACE</span>
          <h1>Welcome back, {{ firstName }} <span class="wave">👋</span></h1>
          <p>Everything you need is right here. Pick a service to get started.</p>
        </div>
        <div class="date-card">{{ today }}</div>
      </section>

      <section class="section-head">
        <div><span class="eyebrow">SERVICES</span><h2>What do you want to do?</h2></div>
      </section>

      <section class="service-grid">
        <a routerLink="/calculator" class="service-card">
          <span class="service-icon">🧮</span><span class="service-number">01</span>
          <h3>Calculator</h3><p>Perform quick calculations and keep a history of your work.</p><span class="service-link">Open service →</span>
        </a>
        <a routerLink="/feedback" class="service-card">
          <span class="service-icon">💬</span><span class="service-number">02</span>
          <h3>Feedback</h3><p>Rate a service and share suggestions that can make it better.</p><span class="service-link">Give feedback →</span>
        </a>
        <a routerLink="/activity" class="service-card">
          <span class="service-icon">📊</span><span class="service-number">03</span>
          <h3>Activity</h3><p>Review your recent calculator and feedback activity.</p><span class="service-link">View activity →</span>
        </a>
        <a routerLink="/profile" class="service-card">
          <span class="service-icon">👤</span><span class="service-number">04</span>
          <h3>Profile</h3><p>View your account details and membership information.</p><span class="service-link">View profile →</span>
        </a>
      </section>

      <section class="recent-section">
        <div class="section-head inline">
          <div><span class="eyebrow">RECENT</span><h2>Latest activity</h2></div>
          <a routerLink="/activity">View all →</a>
        </div>

        @if (activities.activities().length === 0) {
          <div class="empty-state">No activity yet. Try the calculator or submit feedback.</div>
        } @else {
          <div class="activity-list">
            @for (item of activities.activities().slice(0, 4); track item.id) {
              <div class="activity-row">
                <span class="activity-dot">{{ icon(item.type) }}</span>
                <div><strong>{{ item.title }}</strong><p>{{ item.detail }}</p></div>
                <time>{{ item.time }}</time>
              </div>
            }
          </div>
        }
      </section>
    </div>
  `
})
export class DashboardComponent {
  readonly auth = inject(AuthService);
  readonly activities = inject(ActivityService);

  get firstName(): string {
    return this.auth.currentUser()?.name.split(' ')[0] || 'there';
  }

  get today(): string {
    return new Date().toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
  }

  icon(type: string): string {
    return type === 'Calculator' ? '🧮' : type === 'Feedback' ? '💬' : '👤';
  }
}
