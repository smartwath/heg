import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChancesCalculator } from './chances-calculator';

describe('ChancesCalculator', () => {
  let component: ChancesCalculator;
  let fixture: ComponentFixture<ChancesCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChancesCalculator],
    }).compileComponents();

    fixture = TestBed.createComponent(ChancesCalculator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
