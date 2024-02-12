import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../dtos/api-response.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientVerifyService {

  private apiUrl = environment.gcpCommAccApiUrl;
  constructor(private http: HttpClient) { }

  getClientVerification(clientId: string, refresh: string = 'false'): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}client-verify/verify/${clientId}?returnType=array&refresh=${refresh}`);
  }

  updateClientVerifyItem(clientId: string, item: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}client-verify/verify/status/item/${clientId}`, item);
  }

  updateClientVerifyDocItem(clientId: string, item: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}client-verify/verify/status/item/doc/${clientId}`, item);
  }

}
