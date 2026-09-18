import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CountdownService } from '../../services/countdown';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  protected readonly countdown = inject(CountdownService);

  protected readonly time = this.countdown.time;
}
