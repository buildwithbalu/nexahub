import { Injectable, signal } from '@angular/core';
import { User } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userKey = 'nexahub_user';
  private readonly sessionKey = 'nexahub_logged_in';

  readonly isLoggedIn = signal(localStorage.getItem(this.sessionKey) === 'true');
  readonly currentUser = signal<User | null>(this.readUser());

  register(user: User): boolean {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.readUser();

    if (user && user.email.toLowerCase() === email.toLowerCase() && user.password === password) {
      localStorage.setItem(this.sessionKey, 'true');
      this.isLoggedIn.set(true);
      this.currentUser.set(user);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
  }

  private readUser(): User | null {
    try {
      const raw = localStorage.getItem(this.userKey);
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  }
}
