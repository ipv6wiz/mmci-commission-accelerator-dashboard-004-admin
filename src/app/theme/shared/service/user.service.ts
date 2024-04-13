import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from "../../../../environments/environment";
import {ApiResponse} from "../dtos/api-response.dto";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = environment.gcpCommAccApiUrl;

  constructor(
       private http: HttpClient
  ) {}

  getUserName(userId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}users/user/${userId}/name`);
  }

}
