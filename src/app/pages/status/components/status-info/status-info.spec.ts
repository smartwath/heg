import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusInfo } from './status-info';

describe('StatusInfo', () => {
  let component: StatusInfo;
  let fixture: ComponentFixture<StatusInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
