import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PromoCodeDto } from '../dtos/promo-code.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { ApiResponse } from '../dtos/api-response.dto';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {
  private apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'advance/promo-codes';
  private readonly endPointUrl: string;

  constructor(private http: HttpClient) {
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
    console.log('OptionsService - endPointUrl: ', this.endPointUrl);
  }

  async loadAllPromoCodes(): Promise<PromoCodeDto[]> {
    const response: ApiResponse = await lastValueFrom(this.getAll(), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async getOnePromoCodeObj(code: string): Promise<PromoCodeDto> {
    const response: ApiResponse = await lastValueFrom(this.getOneObj(code), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async getOnePromoCodeDetails(code: string): Promise<string> {
    const response: ApiResponse = await lastValueFrom(this.getOneDetails(code), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  private getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/`);
  }

  private getOneObj(code: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/obj/${code}`);
  }

  private getOneDetails(code: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/raw/${code}`);
  }

}
