import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampaignHighlights } from './campaign-highlights';

describe('CampaignHighlights', () => {
  let component: CampaignHighlights;
  let fixture: ComponentFixture<CampaignHighlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignHighlights],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignHighlights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
