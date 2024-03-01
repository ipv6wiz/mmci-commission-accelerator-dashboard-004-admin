import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import { ApiResponse } from '../dtos/api-response.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.gcpCommAccApiUrl;
  constructor(private http: HttpClient) { }

    getAll(): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(`${this.apiUrl}clients/dg`);
    }

    getOne(clientId: string): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(`${this.apiUrl}client/${clientId}`)
    }

    updateClientDocItem(clientId: string, docItem: any): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(`${this.apiUrl}client/doc/${clientId}`, docItem);
    }

    updateClientCreditLimit(clientId: string, creditLimitObj: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}client/credit/${clientId}`, creditLimitObj);
    }

    updateClient(clientId: string, data: any): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(`${this.apiUrl}client/${clientId}`, data);
    }

}
