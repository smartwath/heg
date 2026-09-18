import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBanner } from './status-banner';

describe('StatusBanner', () => {
  let component: StatusBanner;
  let fixture: ComponentFixture<StatusBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
