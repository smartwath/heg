import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ClientApiService } from './client-api';

describe('ClientApiService', () => {
  let service: ClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
