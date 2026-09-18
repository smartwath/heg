import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  readonly formData = signal<RegistrationForm>({
    fullName: '',
    phone: '',
    nationalId: '',
    isExistingClient: 'yes',
    product: 'cards',
    agreedToTerms: false,
  });

  onSubmit(): void {
    this.isSubmitting.set(true);
    // Simulate async registration
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSuccess.set(true);
    }, 1200);
  }

  updateField<K extends keyof RegistrationForm>(key: K, value: RegistrationForm[K]): void {
    this.formData.update(f => ({ ...f, [key]: value }));
  }
}
