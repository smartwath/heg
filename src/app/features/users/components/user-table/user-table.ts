import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  imports: [],
  selector: 'app-user-table',
  styleUrl: './user-table.scss',
  templateUrl: './user-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTable {
  readonly users = input.required<User[]>();
  readonly accept = output<User>();
  readonly reject = output<User>();
}
