import { Component, ChangeDetectionStrategy, signal, computed, OnDestroy, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-verification',
  imports: [FormsModule],
  templateUrl: './otp-verification.html',
  styleUrl: './otp-verification.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpVerification implements OnDestroy {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  readonly otpValues = signal<string[]>(['', '', '', '', '', '']);
  readonly timeLeft = signal(105);
  readonly isSubmitting = signal(false);

  private timerInterval: any;

  readonly formattedTime = computed(() => {
    const t = this.timeLeft();
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  });

  constructor() {
    this.startTimer();
  }

  private startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeLeft.update(t => {
        if (t > 0) return t - 1;
        clearInterval(this.timerInterval);
        return 0;
      });
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  resend() {
    if (this.timeLeft() > 0) return;
    this.otpValues.set(['', '', '', '', '', '']);
    this.timeLeft.set(105);
    this.startTimer();
    // Focus first input
    setTimeout(() => {
      this.otpInputs.first?.nativeElement.focus();
    });
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/[^0-9]/g, '');
    const char = val ? val.slice(-1) : '';
    
    this.otpValues.update(arr => {
      const newArr = [...arr];
      newArr[index] = char;
      return newArr;
    });

    if (char && index < 5) {
      this.otpInputs.toArray()[index + 1]?.nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpValues()[index] && index > 0) {
      this.otpInputs.toArray()[index - 1]?.nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text').replace(/[^0-9]/g, '');
    if (pasted) {
      this.otpValues.update(arr => {
        const newArr = [...arr];
        for (let i = 0; i < 6; i++) {
          newArr[i] = pasted[i] || '';
        }
        return newArr;
      });
      const nextIdx = Math.min(pasted.length, 5);
      setTimeout(() => {
        this.otpInputs.toArray()[nextIdx]?.nativeElement.focus();
      });
    }
  }

  onSubmit() {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      alert('تم تأكيد الدخول بنجاح! سيتم توجيهك إلى لوحة التحكم.');
    }, 1200);
  }
}
