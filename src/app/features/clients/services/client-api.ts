import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Client, UpdateClientStatusRequest } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  updateStatus(id: string, data: UpdateClientStatusRequest): Observable<Client> {
    return this.http.patch<Client>(`${this.baseUrl}/clients/${id}/status`, data);
  }
}
