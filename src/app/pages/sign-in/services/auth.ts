import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isLoading = signal(false);
  private readonly http = inject(HttpClient);

  /**
   * يسجّل العميل ويخزّن clientId في localStorage.
   * يرجّع true لو نجح التسجيل (PENDING أو ACCEPTED).
   * المستخدم بيتنقل لصفحة الانتظار مباشرة — الـ WebSocket بتاعها هي اللي تستنّى القرار.
   */
  async login(email: string, password: string): Promise<boolean> {
    this.isLoading.set(true);
    try {
      const response: any = await lastValueFrom(
        this.http.post(`${environment.apiUrl}/clients/register`, {
          username: email,
          password: password,
        })
      );

      const client = response?.client || response;
      const clientId = client?.ClientId || client?.id;

      if (clientId) {
        localStorage.setItem('pending_client_id', clientId.toString());
      }

      if (response?.token) {
        localStorage.setItem('token', response.token);
      }

      this.isLoading.set(false);
      // نرجّع true لو عندنا clientId (PENDING أو ACCEPTED)
      return !!clientId;
    } catch (error) {
      console.error('Registration/Login error', error);
      this.isLoading.set(false);
      return false;
    }
  }
}
