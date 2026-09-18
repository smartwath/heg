import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawSchedule } from './draw-schedule';

describe('DrawSchedule', () => {
  let component: DrawSchedule;
  let fixture: ComponentFixture<DrawSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawSchedule],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
