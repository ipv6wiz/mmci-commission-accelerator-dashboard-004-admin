import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import { lastValueFrom, Observable } from 'rxjs';
import { ApiResponse } from '../dtos/api-response.dto';
import { Client } from '../entities/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl: string = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'client';
  private readonly endPointPlural: string = 'clients';
  private readonly endPointUrl: string;
  private readonly endPointUrlPlural: string;


  constructor(private http: HttpClient) {
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
    this.endPointUrlPlural = `${this.apiUrl}/${this.endPointPlural}`;
  }

  async getOne(uid: string): Promise<Client> {
    return lastValueFrom(this.getOneClient(uid), {defaultValue: {}})
      .then((response: any) => {
        if(response.statusCode === 200) {
          return response.data.client;
        } else {
          throw new Error(`Did not find client with id: ${uid}`);
        }
      }).catch((err) => {
        console.log('Dash001 - Client Service - getOne- error: ', err.message);
        return null;
      })
  }

  async getAll(): Promise<Client[]> {
    return lastValueFrom(this.getAllClients(), {defaultValue: {}})
      .then((response: any) => {
        if(response.statusCode === 200) {
          return response.data.clients;
        } else {
          throw new Error(`Error loading all Clients`);
        }
      }).catch((err) => {
        console.log('Client Service - getAll- error: ', err.message);
        return null;
      })
  }

  async update(clientId: string, data: any): Promise<ApiResponse> {
    return lastValueFrom(this.updateClient(clientId, data))
      .then((response: ApiResponse) => {
        if(response.statusCode === 200) {
          return response; // response should be client doc
        } else {
          throw new Error(`Failed to update client with ID: ${clientId}`);
        }
      }).catch((err) => {
        const msg: string = `Dash001 - Client - update - error: ${err.message}`;
        console.log(msg);
        throw new Error(msg);
      })
  }

    getAllClients(): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(`${this.endPointUrlPlural}/dg`);
    }

    getOneClient(clientId: string): Observable<ApiResponse> {
      return this.http.get<ApiResponse>(`${this.endPointUrl}/${clientId}`)
    }

    updateClientDocItem(clientId: string, docItem: any): Observable<ApiResponse> {
      return this.http.put<ApiResponse>(`${this.endPointUrl}/${clientId}/doc`, docItem);
    }

    updateClientCreditLimit(clientId: string, creditLimitObj: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.endPointUrl}/${clientId}/credit`, creditLimitObj);
    }

    updateClient(clientId: string, data: any): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(`${this.endPointUrl}/${clientId}`, data);
      }

}
