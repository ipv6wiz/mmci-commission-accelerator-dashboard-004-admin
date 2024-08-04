import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root'})
export class DreLookupService {
    private readonly apiUrl: string = environment.gcpCommAccApiUrl;
    private readonly endPoint: string = 'dre';
    private readonly endPointUrl: string;
    constructor(
      private http: HttpClient
    ) {
        this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
    }

    async checkDreLicense(dreNumber: string): Promise<any> {
        try {
            const response = await lastValueFrom(this.getLicenseViaApi(dreNumber));
            if(response.statusCode === 200) {
                return response.data['dreRecord'];
            } else if(response.statusCode === 404){
                throw new Error(response.msg);
            }
        } catch (err: any) {
            const msg: string = `Dash001 - DRE Lookup - error - msg: ${err.message}`;
            console.log(msg);
            throw new Error(msg);
        }
    }

    getLicenseViaApi(dreNumber: string): Observable<any> {
        return this.http.get<any>(`${this.endPointUrl}/${dreNumber}`, {withCredentials: true});
    }
}
