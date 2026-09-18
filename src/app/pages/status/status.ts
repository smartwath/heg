import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { StatusBanner } from './components/status-banner/status-banner';
import { StatusTicket } from './components/status-ticket/status-ticket';
import { StatusTimeline } from './components/status-timeline/status-timeline';
import { StatusInfo } from './components/status-info/status-info';
import { StatusModal } from './components/status-modal/status-modal';

@Component({
  selector: 'app-status',
  imports: [StatusBanner, StatusTicket, StatusTimeline, StatusInfo, StatusModal],
  templateUrl: './status.html',
  styleUrl: './status.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Status {
  readonly isModalOpen = signal(false);

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
