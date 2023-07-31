import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.gcpCommAccApiUrl;
  constructor(private http: HttpClient) { }

    getAll() {
      return this.http.get<any[]>(`${this.apiUrl}clients/dg`);
    }
}
