import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../dtos/api-response.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { ListWithCountDto } from '../dtos/list-with-count.dto';
import { LedgerBalanceDto } from '../dtos/ledger-balance.dto';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private readonly apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'ledger';
  private readonly endPointUrl: string;

  constructor(private http: HttpClient) {
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  async getClientLedger(clientId: string): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.getClientLedgerCall(clientId), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async getClientBalance(clientId: string, withCredit: boolean = true): Promise<LedgerBalanceDto> {
    const response: ApiResponse = await lastValueFrom(this.getClientBalanceCall(clientId, withCredit), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }


  getClientLedgerCall(clientId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/client/${clientId}`);
  }

  getClientBalanceCall(clientId: string, withCredit: boolean): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/client/${clientId}/balance${withCredit ? "?withCredit=true" : ""}`)
  }
}
