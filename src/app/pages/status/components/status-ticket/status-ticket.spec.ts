import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusTicket } from './status-ticket';

describe('StatusTicket', () => {
  let component: StatusTicket;
  let fixture: ComponentFixture<StatusTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
