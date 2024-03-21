import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiResponse } from '../dtos/api-response.dto';
import { EscrowCompanyDto } from '../dtos/escrow-company.dto';
import { ListWithCountDto } from '../dtos/list-with-count.dto';

@Injectable({
  providedIn: 'root'
})
export class EscrowCompanyService {
  private apiUrl = environment.gcpCommAccApiUrl;
  constructor(private http: HttpClient) { }

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
