import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.gcpCommAccApiUrl;
  constructor(private http: HttpClient) { }

    getAll(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}clients/dg`);
    }

    getClientVerification(clientId: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}client-verify/verify/${clientId}?returnType=array`);
    }
}
