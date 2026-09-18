import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../core/services/websocket';
import { Subscription } from 'rxjs';

export interface AdminUser {
  id: string | number;
  username: string;
  password?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'pending' | 'accepted' | 'rejected' | string;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboard implements OnInit, OnDestroy {
  users = signal<AdminUser[]>([
    { id: 1, username: 'ahmed_fathi', password: 'password123', status: 'pending' },
    { id: 2, username: 'mohamed_ali', password: 'securePass456', status: 'pending' },
    { id: 3, username: 'tarek_hegazy', password: 'mypassword', status: 'accepted' },
    { id: 4, username: 'hassan_khalil', password: 'hello_world', status: 'rejected' },
    { id: 5, username: 'omar_saeed', password: 'pass2025', status: 'pending' },
  ]);

  private readonly websocketService = inject(WebsocketService);
  private readonly router = inject(Router);
  private subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.websocketService.listen<AdminUser>('NEW_CLIENT_REGISTERED').subscribe(newClient => {
        this.users.update(current => [newClient, ...current]);
      }),
      this.websocketService.listen<{ id: string | number, status: string }>('CLIENT_STATUS_UPDATED').subscribe(updatedClient => {
        this.users.update(current =>
          current.map(user =>
            user.id === updatedClient.id ? { ...user, status: updatedClient.status } : user
          )
        );
      })
    );
  }

  updateStatus(id: number | string, newStatus: 'ACCEPTED' | 'REJECTED' | 'PENDING' | 'accepted' | 'rejected' | 'pending') {
    // In a real app, you would also call an API service here to update the DB
    this.users.update(current =>
      current.map(user =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  }

  logout() {
    this.router.navigate(['/admin/login']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
