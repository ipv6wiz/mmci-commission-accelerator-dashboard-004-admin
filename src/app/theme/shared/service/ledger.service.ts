import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../dtos/api-response.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { ListWithCountDto } from '../dtos/list-with-count.dto';
import { LedgerBalanceDto } from '../dtos/ledger-balance.dto';
import { AdvanceLedgerPostDto } from '../dtos/advance-ledger-post.dto';
import { FundsReceivedFromEscrowDto } from '../dtos/funds-received-from-escrow.dto';

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

  async loadAllLedgerItems(): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.loadAllLedgerItemsCall(), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async getClientLedger(clientId: string): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.getClientLedgerCall(clientId), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async getClientBalance(clientId: string, withCredit: boolean = true): Promise<LedgerBalanceDto> {
    const response: ApiResponse = await lastValueFrom(this.getClientBalanceCall(clientId, withCredit), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async postAdvance(clientId: string, data: AdvanceLedgerPostDto): Promise<ApiResponse> {
    const response: ApiResponse = await lastValueFrom(this.postAdvanceCall(clientId, data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response;
  }

  async postEscrowFunds(clientId: string, data: FundsReceivedFromEscrowDto): Promise<ApiResponse> {
    const response: ApiResponse = await lastValueFrom(this.postEscrowFundsCall(clientId, data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response;
  }

  postEscrowFundsCall(clientId: string, data: FundsReceivedFromEscrowDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.endPointUrl}/client/${clientId}/escrow-funds`, data);
  }

  postAdvanceCall(clientId: string, data: AdvanceLedgerPostDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.endPointUrl}/client/${clientId}/advance`, data);
  }

  getClientLedgerCall(clientId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/client/${clientId}`);
  }

  getClientBalanceCall(clientId: string, withCredit: boolean): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/client/${clientId}/balance${withCredit ? "?withCredit=true" : ""}`)
  }

  loadAllLedgerItemsCall(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/admin/ledgers`);
  }
}
