import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-admin-login',
  styleUrl: './admin-login.css',
  templateUrl: './admin-login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLogin {
  username = signal('');
  password = signal('');
  isSubmitting = signal(false);
  errorMessage = signal('');

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.username() || !this.password()) {
      this.errorMessage.set('برجاء إدخال اسم المستخدم وكلمة المرور');
      return;
    }
    
    this.isSubmitting.set(true);
    this.errorMessage.set('');

    setTimeout(() => {
      this.isSubmitting.set(false);
      // Mock validation
      if (this.username() === 'admin' && this.password() === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage.set('بيانات الدخول غير صحيحة');
      }
    }, 1000);
  }
}
