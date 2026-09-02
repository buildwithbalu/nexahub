import { Component, inject } from '@angular/core';
import { ActivityService } from '../../core/services/activity.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  template: `
    <div class="page-container">
      <div class="page-title">
        <span class="eyebrow">YOUR HISTORY</span>
        <h1>Activity</h1>
        <p>A timeline of your recent actions inside NexaHub.</p>
      </div>

      @if (activities.activities().length === 0) {
        <div class="empty-state large">No activity yet. Your actions will appear here.</div>
      } @else {
        <section class="timeline">
          @for (item of activities.activities(); track item.id) {
            <article class="timeline-item">
              <div class="timeline-icon">{{ icon(item.type) }}</div>
              <div class="timeline-content">
                <div class="timeline-top"><strong>{{ item.title }}</strong><time>{{ item.time }}</time></div>
                <p>{{ item.detail }}</p>
                <span class="tag">{{ item.type }}</span>
              </div>
            </article>
          }
        </section>
      }
    </div>
  `
})
export class ActivityComponent {
  readonly activities = inject(ActivityService);

  icon(type: string): string {
    return type === 'Calculator' ? '🧮' : type === 'Feedback' ? '💬' : '👤';
  }
}
