import { Injectable, signal } from '@angular/core';
import { Feedback } from '../models/models';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private readonly key = 'nexahub_feedback';
  readonly feedback = signal<Feedback[]>(this.read());

  add(item: Omit<Feedback, 'id' | 'createdAt'>): void {
    const feedback: Feedback = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toLocaleString()
    };

    const next = [feedback, ...this.feedback()];
    localStorage.setItem(this.key, JSON.stringify(next));
    this.feedback.set(next);
  }

  private read(): Feedback[] {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? JSON.parse(raw) as Feedback[] : [];
    } catch {
      return [];
    }
  }
}
