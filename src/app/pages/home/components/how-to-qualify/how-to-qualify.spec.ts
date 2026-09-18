import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowToQualify } from './how-to-qualify';

describe('HowToQualify', () => {
  let component: HowToQualify;
  let fixture: ComponentFixture<HowToQualify>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowToQualify],
    }).compileComponents();

    fixture = TestBed.createComponent(HowToQualify);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
