import { Injectable, inject } from '@angular/core';
import { AuthApiService } from '../../features/auth/services/auth-api';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly TOKEN_KEY = 'admin_token';
  private readonly authApi = inject(AuthApiService);

  async login(credentials: any): Promise<boolean> {
    try {
      const response = await lastValueFrom(
        this.authApi.userLogin(credentials)
      );

      if (response && response.token) {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Admin login error', error);
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return false;

      const payload = JSON.parse(atob(payloadBase64));
      const expSeconds = payload?.exp;

      if (!expSeconds) return false;

      const isExpired = Date.now() >= expSeconds * 1000;
      if (isExpired) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      this.logout();
      return false;
    }
  }
}
