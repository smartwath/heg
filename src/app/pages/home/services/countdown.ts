import { Injectable, signal, OnDestroy } from '@angular/core';

export interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

@Injectable({ providedIn: 'root' })
export class CountdownService implements OnDestroy {
  private targetDate: Date;

  readonly time = signal<CountdownTime>({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.targetDate = this.initTargetDate();
    this.tick();
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  private initTargetDate(): Date {
    const STORAGE_KEY = 'umrah_timer_target_date';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return new Date(stored);
      }
      
      const target = new Date();
      target.setDate(target.getDate() + 7);
      localStorage.setItem(STORAGE_KEY, target.toISOString());
      return target;
    } catch {
      // Fallback for SSR or if localStorage is restricted
      const target = new Date();
      target.setDate(target.getDate() + 7);
      return target;
    }
  }

  private tick(): void {
    const now = new Date();
    const diff = this.targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      this.time.set({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days    = Math.floor(totalSeconds / 86400);
    const hours   = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.time.set({
      days:    this.pad(days),
      hours:   this.pad(hours),
      minutes: this.pad(minutes),
      seconds: this.pad(seconds),
    });
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : String(n);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }
}
