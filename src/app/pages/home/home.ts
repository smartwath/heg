import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnnouncerBanner }      from './components/announcer-banner/announcer-banner';
import { HeroSection }          from './components/hero-section/hero-section';
import { CampaignHighlights }   from './components/campaign-highlights/campaign-highlights';
import { HowToQualify }         from './components/how-to-qualify/how-to-qualify';
import { ChancesCalculator }    from './components/chances-calculator/chances-calculator';
import { WinnerStories }        from './components/winner-stories/winner-stories';
import { RegistrationFormComponent } from './components/registration-form/registration-form';
import { DrawSchedule }         from './components/draw-schedule/draw-schedule';
import { StickyCta }            from './components/sticky-cta/sticky-cta';

@Component({
  selector: 'app-home',
  imports: [
    AnnouncerBanner,
    HeroSection,
    CampaignHighlights,
    HowToQualify,
    ChancesCalculator,
    WinnerStories,
    RegistrationFormComponent,
    DrawSchedule,
    StickyCta,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
