import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StickyCta } from './sticky-cta';

describe('StickyCta', () => {
  let component: StickyCta;
  let fixture: ComponentFixture<StickyCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyCta],
    }).compileComponents();

    fixture = TestBed.createComponent(StickyCta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
