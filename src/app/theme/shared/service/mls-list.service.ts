import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ListWithCountDto } from '../dtos/list-with-count.dto';
import { ApiResponse } from '../dtos/api-response.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { EscrowCompanyDto } from '../dtos/escrow-company.dto';

@Injectable({
  providedIn: 'root'
})
export class MlsListService {
  private readonly apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'mls-list';
  private readonly endPointUrl: string;

  constructor(private http: HttpClient) {
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  async loadAllItems(): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.getAll(), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async loadItemsForSelect(): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.getForSelect(), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async updateItem(uid: string, data: EscrowCompanyDto): Promise<any> {
    const response: ApiResponse = await lastValueFrom(this.update(uid, data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async createItem(data: EscrowCompanyDto): Promise<any> {
    const response: ApiResponse = await lastValueFrom(this.create(data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/`);
  }

  getForSelect(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/select`);
  }

  create(data: EscrowCompanyDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.endPointUrl}/`, data);
  }

  update(uid: string, data: EscrowCompanyDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.endPointUrl}/${uid}`, data);
  }

}
