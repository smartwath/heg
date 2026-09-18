import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chances-calculator',
  imports: [FormsModule],
  templateUrl: './chances-calculator.html',
  styleUrl: './chances-calculator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChancesCalculator {
  readonly spendAmount  = signal(12000);
  readonly newClient    = signal(false);
  readonly salaryCert   = signal(false);

  readonly totalChances = computed(() => {
    let base = Math.floor(this.spendAmount() / 1000);
    if (this.newClient())  base += 5;
    if (this.salaryCert()) base += 15;
    return base;
  });

  readonly progressWidth = computed(() =>
    Math.min(Math.round((this.totalChances() / 120) * 100), 100)
  );

  readonly badgeText = computed(() => {
    const c = this.totalChances();
    if (c >= 50) return 'فرصة ممتازة جداً (فئة بلاتينية)';
    if (c >= 20) return 'فرصة مرتفعة (فئة ذهبية)';
    return 'فرصة جيدة للتأهل للحصول على الجائزة';
  });

  readonly formattedAmount = computed(() =>
    this.spendAmount().toLocaleString('ar-EG')
  );

  onSpendChange(value: string): void {
    this.spendAmount.set(parseInt(value, 10));
  }
}
