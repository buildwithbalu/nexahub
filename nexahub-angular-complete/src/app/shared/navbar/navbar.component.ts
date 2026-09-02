import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <a routerLink="/dashboard" class="brand">
        <span class="brand-mark">N</span>
        <span>Nexa<span>Hub</span></span>
      </a>

      <nav class="nav-links">
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/calculator" routerLinkActive="active">Calculator</a>
        <a routerLink="/feedback" routerLinkActive="active">Feedback</a>
        <a routerLink="/activity" routerLinkActive="active">Activity</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
      </nav>

      <div class="nav-user">
        <a routerLink="/profile" class="user-chip">
          <span class="avatar">{{ initial }}</span>
          <span class="user-name">{{ auth.currentUser()?.name }}</span>
        </a>
        <button class="logout-btn" (click)="logout()">Logout</button>
      </div>
    </header>
  `
})
export class NavbarComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  get initial(): string {
    return this.auth.currentUser()?.name?.charAt(0).toUpperCase() || 'U';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
