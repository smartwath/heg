import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isLoading = signal(false);

  login(username: string, _password: string): Promise<boolean> {
    this.isLoading.set(true);
    return new Promise(resolve => {
      setTimeout(() => {
        this.isLoading.set(false);
        resolve(true);
      }, 1500);
    });
  }
}
