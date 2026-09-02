import { Injectable, signal } from '@angular/core';
import { Activity } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private readonly key = 'nexahub_activities';
  readonly activities = signal<Activity[]>(this.read());

  add(type: Activity['type'], title: string, detail: string): void {
    const item: Activity = {
      id: crypto.randomUUID(),
      type,
      title,
      detail,
      time: new Date().toLocaleString()
    };

    const next = [item, ...this.activities()].slice(0, 20);
    localStorage.setItem(this.key, JSON.stringify(next));
    this.activities.set(next);
  }

  private read(): Activity[] {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? JSON.parse(raw) as Activity[] : [];
    } catch {
      return [];
    }
  }
}
