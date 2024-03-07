import { Injectable } from '@angular/core';
import {Options} from "../entities/options.interface";
import {OptionValues} from "../entities/option-values.interface";
import { Observable } from 'rxjs';
import { ApiResponse } from '../dtos/api-response.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private apiUrl = environment.gcpCommAccApiUrl;

  constructor(
    private http: HttpClient
    ) {  }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}options`);
  }

  getOneById(optionId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}options/id/${optionId}`);
  }

  getOptionsByType(type: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}options/type/${type}`);
  }

  createOption(optionData: Options): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}`, optionData);
  }

  createOptionValue(optionId: string, valueData: OptionValues): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}options/value/${optionId}`, valueData);
  }

  updateOptionById(optionId: string, optionUpdateData: Options): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}options/id/${optionId}`, optionUpdateData);
  }

  updateOptionValue(optionId: string, key: string, optionValueData: OptionValues): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}options/value/${optionId}/${key}`, optionValueData);
  }

  deleteOptionById(optionId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}options/id/${optionId}`);
  }

  deleteOptionValueById(optionId: string, key: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}options/value/${optionId}/${key}`);
  }

}
