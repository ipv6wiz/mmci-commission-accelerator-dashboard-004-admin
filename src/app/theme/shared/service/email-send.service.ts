import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelpersService } from './helpers.service';
import { MailOutTemplateMessageEntity } from '../entities/mail-out-template-message.entity';
import { ApiResponse } from '../dtos/api-response.dto';
import { lastValueFrom, Observable } from 'rxjs';

class MailOutTemplateEntity {
}

@Injectable({
  providedIn: 'root'
})
export class EmailSendService {
  private readonly apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'email';
  private readonly endPointUrl: string;

  constructor(private http: HttpClient, private helpers: HelpersService) {
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  async sendEmailWithTemplate(email: MailOutTemplateEntity): Promise<ApiResponse> {
    const response: ApiResponse = await lastValueFrom(this.sendEWT(email), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response;
  }

  sendEWT(email: MailOutTemplateEntity): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.endPointUrl}/send-with-template`, email);
  }
}
