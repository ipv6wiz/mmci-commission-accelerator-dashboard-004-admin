import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Registrant } from '../entities/registrant.entity';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl: string = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'register';
  private readonly endPointUrl: string;

  constructor(private http: HttpClient) {
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  async getOne(uid: string): Promise<Registrant> {
    try {
      const response = await lastValueFrom(this.getOneViaApi(uid), {defaultValue: {}});
      if(response.statusCode === 200) {
        return response.data.registrant;
      } else {
        throw new Error(`Did not find client registration with id: ${uid}`);
      }
    } catch (err: any) {
      const msg = `Dash001 - Registration Service - getOne- error: ${err.message}`;
      console.log(msg);
      throw new Error(msg);
    }
  }

  async saveRegForm(registrant: Registrant): Promise<boolean> {
    console.log('-------> RegistrationService - create - registrant: ', registrant);
    try {
      const response = await lastValueFrom(this.saveRegFormViaApi(registrant), {defaultValue: {}});
      if(response.statusCode === 201){
        return true;
      } else {
        throw new Error(`Create Registration doc for ${registrant.uid} failed.`)
      }
    } catch (err: any) {
      const msg = `Dash001 - Registration Service - create - error: ${err.message}`;
      console.log(msg);
      throw new Error(msg);
    }
  }

  getOneViaApi(uid: string): Observable<any> {
    return this.http.get<any>(`${this.endPointUrl}/register/${uid}`);
  }

  saveRegFormViaApi(registrant: Registrant): Observable<any>{
    return this.http.post<any>(`${this.endPointUrl}reg-form`, registrant);
  }

}
