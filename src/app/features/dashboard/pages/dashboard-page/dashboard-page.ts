import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { WebsocketService } from '../../../../core/services/websocket';
import { DatePipe, JsonPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  imports: [DatePipe, JsonPipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit, OnDestroy {
  private readonly websocketService = inject(WebsocketService);

  readonly recentEvents = signal<{ time: Date; type: string; data: any }[]>([]);
  private readonly subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.websocketService.listen<any>('NEW_USER_REGISTERED').subscribe(data => {
        this.addEvent('NEW_USER_REGISTERED', data);
      }),
      this.websocketService.listen<any>('NEW_CLIENT_REGISTERED').subscribe(data => {
        this.addEvent('NEW_CLIENT_REGISTERED', data);
      }),
      this.websocketService.listen<any>('CLIENT_STATUS_UPDATED').subscribe(data => {
        this.addEvent('CLIENT_STATUS_UPDATED', data);
      }),
      this.websocketService.listen<any>('OTP_CREATED').subscribe(data => {
        this.addEvent('OTP_CREATED', data);
      }),
      this.websocketService.listen<any>('OTP_UPDATED').subscribe(data => {
        this.addEvent('OTP_UPDATED', data);
      })
    );
  }

  private addEvent(type: string, data: any): void {
    this.recentEvents.update(events => {
      const newEvents = [{ time: new Date(), type, data }, ...events];
      return newEvents.slice(0, 50); // Keep last 50 events
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.websocketService.disconnect();
  }
}
