import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Otp, CreateOtpRequest, VerifyOtpRequest } from '../models/otp';

@Injectable({
  providedIn: 'root'
})
export class OtpApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  create(data: CreateOtpRequest): Observable<Otp> {
    return this.http.post<Otp>(`${this.baseUrl}/otp/create`, data);
  }

  update(id: string, data: VerifyOtpRequest): Observable<Otp> {
    return this.http.patch<Otp>(`${this.baseUrl}/otp/update/${id}`, data);
  }
}
