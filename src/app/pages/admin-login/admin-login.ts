import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../core/services/admin-auth';

@Component({
  imports: [FormsModule],
  selector: 'app-admin-login',
  styleUrl: './admin-login.css',
  templateUrl: './admin-login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLogin {
  email = signal('');
  password = signal('');
  isSubmitting = signal(false);
  errorMessage = signal('');

  private readonly router = inject(Router);
  private readonly authService = inject(AdminAuthService);

  async onSubmit() {
    if (!this.email() || !this.password()) {
      this.errorMessage.set('برجاء إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const success = await this.authService.login({
      email: this.email(),
      password: this.password()
    });

    this.isSubmitting.set(false);

    if (success) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMessage.set('بيانات الدخول غير صحيحة');
    }
  }
}
