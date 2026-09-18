import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WinnerStories } from './winner-stories';

describe('WinnerStories', () => {
  let component: WinnerStories;
  let fixture: ComponentFixture<WinnerStories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinnerStories],
    }).compileComponents();

    fixture = TestBed.createComponent(WinnerStories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
