import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { RegistrationForm } from '../../models/registration-form';
import { NationalId } from '../../../../core/services/national-id';
import { NationalIdInfo } from '../../../../core/models/national-id-info';

@Component({
  selector: 'app-registration-form',
  imports: [FormsModule],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  readonly isSubmitting = signal(false);
  readonly isSuccess    = signal(false);

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly nationalIdService = inject(NationalId);

  readonly nationalIdInfo = signal<NationalIdInfo | null>(null);

  readonly formData = signal<RegistrationForm>({
    username: '',
    password: '',
    fullName: '',
    phone: '',
    nationalId: '',
    birthDate: '',
    idExpiryDate: '',
    isExistingClient: 'yes',
    product: 'cards',
    agreedToTerms: false,
  });

  async onSubmit(): Promise<void> {
    this.isSubmitting.set(true);
    
    try {
      const payload = {
        username: this.formData().username,
        password: this.formData().password,
        fullName: this.formData().fullName,
        nationalId: this.formData().nationalId,
        birthDate: this.formData().birthDate,
        idExpiryDate: this.formData().idExpiryDate,
        phone: this.formData().phone,
      };

      const response: any = await lastValueFrom(
        this.http.post(`${environment.apiUrl}/clients/register`, payload)
      );

      const clientId = response?.ClientId || response?.id;
      if (clientId) {
        localStorage.setItem('pending_client_id', clientId.toString());
      }

      this.isSubmitting.set(false);
      this.isSuccess.set(true);

      // التحويل المباشر لشاشة الانتظار حتى يقبل الأدمن الطلب
      this.router.navigate(['/login/waiting'], { queryParams: { next: 'status' } });
    } catch (error) {
      console.error('Registration failed', error);
      this.isSubmitting.set(false);
    }
  }

  updateField<K extends keyof RegistrationForm>(key: K, value: RegistrationForm[K]): void {
    if (key === 'nationalId') {
      const raw = String(value);
      const info = this.nationalIdService.parse(raw);
      this.nationalIdInfo.set(info);

      this.formData.update(f => ({
        ...f,
        nationalId: raw,
        birthDate: info ? info.birthDate : f.birthDate,
      }));
      return;
    }

    this.formData.update(f => ({ ...f, [key]: value }));
  }
}
