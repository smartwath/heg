import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoginForm } from '../../models/login-form';

@Component({
  selector: 'app-login-hero',
  imports: [FormsModule],
  templateUrl: './login-hero.html',
  styleUrl: './login-hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginHero {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoading = this.auth.isLoading;
  readonly showPass = signal(false);
  readonly showKeypad = signal(false);

  readonly form = signal<LoginForm>({
    email: '',
    password: '',
    rememberUsername: true,
  });

  readonly keypadDigits = computed(() => ['7', '2', '9', '4', '0', '1', '8', '5', '3', '6']);

  togglePassword(): void {
    this.showPass.update(v => !v);
  }

  toggleKeypad(): void {
    this.showKeypad.update(v => !v);
  }

  appendKeypadChar(char: string): void {
    this.form.update(f => ({ ...f, password: f.password + char }));
  }

  updateField<K extends keyof LoginForm>(key: K, value: LoginForm[K]): void {
    this.form.update(f => ({ ...f, [key]: value }));
  }

  async onSubmit(): Promise<void> {
    const success = await this.auth.login(this.form().email, this.form().password);
    if (success) {
      this.router.navigate(['/login/waiting'], { queryParams: { next: 'otp' } });
    }
  }
}
