import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root'})
export class DreLookupService {
    private verifyDreLicenseUrl = 'http://127.0.0.1:5001/comm-acc-demo/us-central1/verifyDreLicense';
    constructor(private http: HttpClient) {}

    checkLicense(dreNumber: string): Observable<any> {
        return this.http.get(`${this.verifyDreLicenseUrl}?dre=${dreNumber}`);
    }

    verifyLicense(dreNumber: string) {

    }
}
