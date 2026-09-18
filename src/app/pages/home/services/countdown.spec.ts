import { TestBed } from '@angular/core/testing';
import { Countdown } from './countdown';

describe('Countdown', () => {
  let service: Countdown;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Countdown);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
