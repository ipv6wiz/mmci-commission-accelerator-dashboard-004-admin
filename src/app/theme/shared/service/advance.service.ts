import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AdvanceCreateDto } from '../dtos/advance-create.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiResponse } from '../dtos/api-response.dto';
import { AdvanceUpdateDto } from '../dtos/advance-update.dto';
import { HttpClient } from '@angular/common/http';
import { ListWithCountDto } from '../dtos/list-with-count.dto';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AdvanceService {
  private readonly apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'advance';
  private readonly endPointUrl: string;

  constructor(private http: HttpClient, private helpers: HelpersService) {
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  async loadAllItemsForAdminDG(filter: string = '', sortBy: string = 'dateRequested', sortDir: string = 'desc'): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.getAllForAdminDG(filter, sortBy, sortDir), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async loadAllItemsForClient(clientId: string, sortBy: string = '', sortDir: string = 'desc'): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.getAllByClientId(clientId, sortBy, sortDir), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async loadAllItemsForClientFiltered(clientId: string, filter: string = '', sortBy: string = '', sortDir: string = 'desc'): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.getAllFilteredByClientId(clientId, filter, sortBy, sortDir), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async loadSummaries(clientId: string): Promise<Map<string, any>> {
    const response: ApiResponse = await lastValueFrom(this.getSummariesByClientId(clientId), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    if(response.statusCode === 200) {
      return JSON.parse(JSON.stringify(response.data), this.helpers.reviver);
    } else {
      return new Map<string, any>();
    }
  }

  async loadAdvanceNames(clientId: string): Promise<Map<string, string>> {
    const response: ApiResponse = await lastValueFrom(this.getAdvanceNamesByClientId(clientId));
    if(response.statusCode === 200) {
      return JSON.parse(JSON.stringify(response.data), this.helpers.reviver);
    } else {
      return new Map<string, string>();
    }
  }

  async updateItem(uid: string, data: AdvanceUpdateDto): Promise<ApiResponse> {
    const response: ApiResponse = await lastValueFrom(this.update(uid, data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response;
  }

  async createItem(data: AdvanceCreateDto): Promise<any> {
    const response: ApiResponse = await lastValueFrom(this.create(data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

// --------------------------------------------------------------------------------

  makeApiCallWithQuery(base: string, sortBy: string = '', sortDir: string = 'asc', filter: string = ''): string {
    let needAmpersand: boolean = false;

    if(sortBy !== '' || filter !== '') {
      base += '?';
    }
    if(sortBy && sortBy !== '') {
      base += `sortBy=${sortBy}&sortDir=${sortDir}`;
      needAmpersand = true;
    }
    if(filter !== '') {
      base += needAmpersand ? '&' : '';
      base += `filter=${filter}`;
    }
    return base;
  }

  getAllForAdminDG(filter: string, sortBy: string, sortDir: string = 'desc'): Observable<ApiResponse> {
    const url: string = this.makeApiCallWithQuery(`${this.endPointUrl}/dg`, sortBy, sortDir, filter);
    return this.http.get<ApiResponse>(url);
  }

  getAllByClientId(clientId: string, sortBy: string, sortDir: string = 'desc'): Observable<ApiResponse> {
    const url: string = this.makeApiCallWithQuery(`${this.endPointUrl}/client/${clientId}`, sortBy, sortDir);
    return this.http.get<ApiResponse>(url);
  }

  getAllFilteredByClientId(clientId: string, filter: string, sortBy: string, sortDir: string = 'desc'): Observable<ApiResponse> {
    const url: string = this.makeApiCallWithQuery(`${this.endPointUrl}/client/${clientId}`, sortBy, sortDir, filter);
    return this.http.get<ApiResponse>(url);
  }

  getSummariesByClientId(clientId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/client/${clientId}/summaries`);
  }

  getAdvanceNamesByClientId(clientId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/client/${clientId}/advanceNames`);
  }

  create(data: AdvanceCreateDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.endPointUrl}`, data);
  }

  update(uid: string, data: AdvanceUpdateDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.endPointUrl}/${uid}`, data);
  }
}
