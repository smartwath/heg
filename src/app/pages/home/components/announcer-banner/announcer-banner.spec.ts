import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnouncerBanner } from './announcer-banner';

describe('AnnouncerBanner', () => {
  let component: AnnouncerBanner;
  let fixture: ComponentFixture<AnnouncerBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncerBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnouncerBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
