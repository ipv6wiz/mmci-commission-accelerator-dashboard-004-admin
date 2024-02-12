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

    updateClientDocItem(clientId: string, docItem: any): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(`${this.apiUrl}client/doc/${clientId}`, docItem);
    }
}
