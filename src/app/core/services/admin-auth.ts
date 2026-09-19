import { Injectable, inject } from '@angular/core';
import { AuthApiService } from '../../features/auth/services/auth-api';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly TOKEN_KEY = 'admin_token';
  private readonly TOKEN_EXPIRY_KEY = 'admin_token_expiry';
  private readonly authApi = inject(AuthApiService);

  async login(credentials: any): Promise<boolean> {
    try {
      const response = await lastValueFrom(
        this.authApi.userLogin(credentials)
      );
      
      if (response && response.token) {
        this.setSession(response.token, response.expiresIn || 60);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Admin login error', error);
      return false;
    }
  }

  private setSession(token: string, expiresInMinutes: number) {
    localStorage.setItem(this.TOKEN_KEY, token);
    const expiryTime = new Date().getTime() + expiresInMinutes * 60 * 1000;
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const expiryString = localStorage.getItem(this.TOKEN_EXPIRY_KEY);

    if (!token || !expiryString) {
      return false;
    }

    const expiryTime = parseInt(expiryString, 10);
    if (new Date().getTime() > expiryTime) {
      this.logout();
      return false;
    }

    return true;
  }
}
