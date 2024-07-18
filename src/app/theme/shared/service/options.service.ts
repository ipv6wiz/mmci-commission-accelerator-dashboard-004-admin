import { Injectable } from '@angular/core';
import {OptionsEntity} from "../entities/options.interface";
import {OptionValues} from "../entities/option-values.interface";
import { lastValueFrom, Observable } from 'rxjs';
import { ApiResponse } from '../dtos/api-response.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ListWithCountDto } from '../dtos/list-with-count.dto';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'options';
  private readonly endPointUrl: string;

  constructor(
    private http: HttpClient
    ) {
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
    console.log('OptionsService - endPointUrl: ', this.endPointUrl);
  }

  async loadAllOptionItems(): Promise<ListWithCountDto> {
    console.log('OptionsService - loadAllItems');
    const response: ApiResponse = await lastValueFrom(this.getAll(), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    console.log('OptionsService - loadAllItems - response: ', response);
    return response.data;
  }

  async loadValuesItemsForSelect(type: string): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.getForSelect(type), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async getOneOptionItem(uid: string): Promise<ApiResponse> {
    const response: ApiResponse = await lastValueFrom(this.getOneById(uid), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response;
  }

  async updateOptionItem(uid: string, data: OptionsEntity): Promise<ApiResponse> {
    const response: ApiResponse = await lastValueFrom(this.updateOptionById(uid, data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response;
  }

  async createOptionItem(data: OptionsEntity): Promise<ApiResponse> {
    const response: ApiResponse = await lastValueFrom(this.optionTypeCreate(data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response;
  }

  async updateOptionValueItem(uid: string, key: string, data: OptionValues): Promise<ApiResponse> {
    const response: ApiResponse = await lastValueFrom(this.updateOptionValue(uid, key, data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response;
  }

  async createOptionValueItem(uid: string, data: OptionValues): Promise<ApiResponse> {
    const response: ApiResponse = await lastValueFrom(this.createOptionValue(uid, data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response;
  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}`);
  }

  getForSelect(type: string, sortBy: string = 'sortOrder'): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/select/${type}?sortBy=${sortBy}`);
  }

  getOneById(optionId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/id/${optionId}`);
  }

  getOptionsByType(type: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/type/${type}`);
  }

  optionTypeCreate(optionData: OptionsEntity): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.endPointUrl}`, optionData);
  }

  createOptionValue(optionId: string, valueData: OptionValues): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.endPointUrl}/value/${optionId}`, valueData);
  }

  updateOptionById(optionId: string, optionUpdateData: OptionsEntity): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.endPointUrl}/id/${optionId}`, optionUpdateData);
  }

  updateOptionValue(optionId: string, key: string, optionValueData: OptionValues): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.endPointUrl}/value/${optionId}/${key}`, optionValueData);
  }

  deleteOptionById(optionId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.endPointUrl}/id/${optionId}`);
  }

  deleteOptionValueById(optionId: string, key: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.endPointUrl}/value/${optionId}/${key}`);
  }

}
