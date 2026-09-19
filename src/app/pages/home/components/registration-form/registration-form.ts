import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { RegistrationForm } from '../../models/registration-form';

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

  readonly formData = signal<RegistrationForm>({
    fullName: '',
    phone: '',
    nationalId: '',
    isExistingClient: 'yes',
    product: 'cards',
    agreedToTerms: false,
  });

  async onSubmit(): Promise<void> {
    this.isSubmitting.set(true);
    
    try {
      await lastValueFrom(
        this.http.post(`${environment.apiUrl}/campaign/register`, this.formData())
      );
      this.isSubmitting.set(false);
      this.isSuccess.set(true);
    } catch (error) {
      console.error('Registration failed', error);
      this.isSubmitting.set(false);
      // Optional: Handle error UI
    }
  }

  updateField<K extends keyof RegistrationForm>(key: K, value: RegistrationForm[K]): void {
    this.formData.update(f => ({ ...f, [key]: value }));
  }
}
