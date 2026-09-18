import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-status-ticket',
  imports: [],
  templateUrl: './status-ticket.html',
  styleUrl: './status-ticket.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusTicket {
  readonly onConfirm = output<void>();
}
