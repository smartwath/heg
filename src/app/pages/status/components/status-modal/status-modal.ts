import { Component, ChangeDetectionStrategy, output, signal } from '@angular/core';

@Component({
  selector: 'app-status-modal',
  imports: [],
  templateUrl: './status-modal.html',
  styleUrl: './status-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusModal {
  readonly onClose = output<void>();
  readonly isSubmitting = signal(false);

  onSubmit() {
    this.isSubmitting.set(true);
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.onClose.emit();
      alert('تم تأكيد بيانات السفر بنجاح! سيتواصل معك مستشارك المصرفي خلال 24 ساعة.');
    }, 1200);
  }
}
