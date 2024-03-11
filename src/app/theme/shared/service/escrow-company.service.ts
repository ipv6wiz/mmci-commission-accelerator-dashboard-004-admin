import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../dtos/api-response.dto';
import { EscrowCompanyDto } from '../dtos/escrow-company.dto';

@Injectable({
  providedIn: 'root'
})
export class EscrowCompanyService {
  private apiUrl = environment.gcpCommAccApiUrl;
  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}escrow-companies`);
  }

  getForSelect(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}escrow-companies/select`);
  }

  create(data: EscrowCompanyDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}escrow-companies/`, data);
  }

  update(uid: string, data: EscrowCompanyDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}escrow-companies/${uid}`, data);
  }

}
