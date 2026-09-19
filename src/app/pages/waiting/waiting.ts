import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../core/services/websocket';

type WaitingState = 'waiting' | 'rejected';

@Component({
  selector: 'app-waiting',
  imports: [],
  templateUrl: './waiting.html',
  styleUrl: './waiting.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Waiting implements OnInit, OnDestroy {
  readonly state = signal<WaitingState>('waiting');

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly websocketService = inject(WebsocketService);
  private subscriptions: Subscription[] = [];

  /** الصفحة اللي هنروح ليها بعد الموافقة: 'otp' أو 'status' */
  private nextPage = 'status';

  ngOnInit() {
    // نقرأ ?next= من الـ URL
    this.nextPage = this.route.snapshot.queryParamMap.get('next') ?? 'status';

    this.subscriptions.push(
      this.websocketService
        .listen<{ ClientId?: string; id?: string; status: string }>('CLIENT_STATUS_UPDATED')
        .subscribe((data) => {
          const status = data.status?.toUpperCase();
          if (status === 'ACCEPTED') {
            const destination = this.nextPage === 'otp' ? '/login/otp' : '/login/status';
            this.router.navigate([destination]);
          } else if (status === 'REJECTED') {
            this.state.set('rejected');
          }
        })
    );
  }

  retryLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
