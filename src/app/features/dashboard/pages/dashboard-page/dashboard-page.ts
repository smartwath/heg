import { ChangeDetectionStrategy, Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { WebsocketService } from '../../../../core/services/websocket';
import { DatePipe, JsonPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserApiService } from '../../../users/services/user-api';
import { UserTable } from '../../../users/components/user-table/user-table';
import { User } from '../../../users/models/user';

@Component({
  selector: 'app-dashboard-page',
  imports: [DatePipe, JsonPipe, UserTable],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit, OnDestroy {
  private readonly websocketService = inject(WebsocketService);
  private readonly userApiService = inject(UserApiService);

  readonly recentEvents = signal<{ time: Date; type: string; data: any }[]>([]);
  readonly users = signal<User[]>([]);
  private readonly subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.loadUsers();

    this.subscriptions.push(
      this.websocketService.listen<any>('NEW_USER_REGISTERED').subscribe(data => {
        this.addEvent('NEW_USER_REGISTERED', data);
        this.loadUsers(); // Refresh on new user
      }),
      this.websocketService.listen<any>('NEW_CLIENT_REGISTERED').subscribe(data => {
        this.addEvent('NEW_CLIENT_REGISTERED', data);
        this.loadUsers();
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

  private loadUsers(): void {
    this.subscriptions.push(
      this.userApiService.getAllUsers().subscribe({
        next: (data) => {
          this.users.set(data || []);
        },
        error: (err) => {
          console.error('Failed to load users', err);
        }
      })
    );
  }

  private addEvent(type: string, data: any): void {
    this.recentEvents.update(events => {
      const newEvents = [{ time: new Date(), type, data }, ...events];
      return newEvents.slice(0, 50); // Keep last 50 events
    });
  }

  onAcceptUser(user: User): void {
    console.log('Accepted user:', user);
    // TODO: Implement API call to accept user
  }

  onRejectUser(user: User): void {
    console.log('Rejected user:', user);
    // TODO: Implement API call to reject user
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.websocketService.disconnect();
  }
}
