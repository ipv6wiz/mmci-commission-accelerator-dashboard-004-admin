import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ListWithCountDto } from '../dtos/list-with-count.dto';
import { ApiResponse } from '../dtos/api-response.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { UserCreateDto } from '../dtos/user-create.dto';
import { User } from '../entities/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'users';
  private readonly endPointUrl: string;

  constructor(private http: HttpClient) {
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
    // console.log('UsersService - endPointUrl: ', this.endPointUrl);
  }

  async loadAllItems(): Promise<ListWithCountDto> {
    console.log('UsersService - loadAllItems');
    const response: ApiResponse = await lastValueFrom(this.getAll(), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    console.log('UsersService - loadAllItems - response: ', response);
    return response.data;
  }

  async loadItemsForSelect(): Promise<ListWithCountDto> {
    const response: ApiResponse = await lastValueFrom(this.getForSelect(), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async getOneItem(uid: string): Promise<User> {
    const response: ApiResponse = await lastValueFrom(this.getOne(uid), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async updateItem(uid: string, data: UserCreateDto): Promise<any> {
    const response: ApiResponse = await lastValueFrom(this.update(uid, data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  async createItem(data: UserCreateDto): Promise<any> {
    const response: ApiResponse = await lastValueFrom(this.create(data), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  getAll(): Observable<ApiResponse> {
    console.log('UsersService - getAll');
    return this.http.get<ApiResponse>(`${this.endPointUrl}`);
  }

  getForSelect(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/select`);
  }

  getOne(uid: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.endPointUrl}/user/${uid}`);
  }

  create(data: UserCreateDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.endPointUrl}`, data);
  }

  update(uid: string, data: UserCreateDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.endPointUrl}/${uid}`, data);
  }
}
