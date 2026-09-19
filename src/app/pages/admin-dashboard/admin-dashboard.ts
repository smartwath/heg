import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../../core/services/websocket';
import { Subscription } from 'rxjs';
import { ClientApiService } from '../../features/clients/services/client-api';
import { Client, ClientOtp, UpdateClientStatusRequest } from '../../features/clients/models/client';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboard implements OnInit, OnDestroy {
  clients = signal<Client[]>([]);

  private readonly websocketService = inject(WebsocketService);
  private readonly router = inject(Router);
  private readonly clientApiService = inject(ClientApiService);
  private subscriptions: Subscription[] = [];

  ngOnInit() {
    this.loadClients();

    this.subscriptions.push(
      this.websocketService.listen<any>('NEW_CLIENT_REGISTERED').subscribe(() => {
        this.loadClients();
      }),

      this.websocketService.listen<{ id?: string; ClientId?: string; status: string }>('CLIENT_STATUS_UPDATED').subscribe(updated => {
        const updateId = updated.ClientId || updated.id;
        this.clients.update(current =>
          current.map(client => {
            const clientId = client.ClientId || client.id;
            return clientId == updateId ? { ...client, status: updated.status } : client;
          })
        );
      }),

      this.websocketService.listen<ClientOtp>('OTP_CREATED').subscribe(newOtp => {
        this.clients.update(current =>
          current.map(client => {
            const clientId = client.ClientId || client.id;
            if (clientId == newOtp.clientId) {
              const existingOtps = client.otps || [];
              return {
                ...client,
                status: 'PENDING',          // ← نرجّع PENDING عشان الأزرار تتفعّل
                otps: [...existingOtps, newOtp],
              };
            }
            return client;
          })
        );
      })
    );
  }

  private loadClients() {
    this.subscriptions.push(
      this.clientApiService.getAllClients().subscribe({
        next: (data) => {
          this.clients.set(data || []);
        },
        error: (err) => {
          console.error('Failed to load clients', err);
        }
      })
    );
  }

  updateStatus(id: string, newStatus: 'ACCEPTED' | 'REJECTED' | 'PENDING') {
    const statusData: UpdateClientStatusRequest = { status: newStatus };
    this.subscriptions.push(
      this.clientApiService.updateStatus(id, statusData).subscribe({
        next: (updatedClient) => {
          this.clients.update(current =>
            current.map(client => {
              const clientId = client.ClientId || client.id;
              return clientId == id ? { ...client, status: updatedClient.status } : client;
            })
          );
        },
        error: (err) => {
          console.error('Failed to update client status', err);
        }
      })
    );
  }

  getLatestOtp(client: Client): string {
    if (!client.otps || client.otps.length === 0) return '—';
    return client.otps[client.otps.length - 1].otp;
  }

  logout() {
    this.router.navigate(['/admin/login']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
