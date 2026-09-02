import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    @if (auth.isLoggedIn()) {
      <app-navbar />
    }
    <main class="app-shell">
      <router-outlet />
    </main>
    <footer class="site-footer">
      <span>NexaHub</span>
      <span>Built with Angular • Student Service Portal</span>
    </footer>
  `
})
export class AppComponent {
  protected readonly auth = inject(AuthService);
}
