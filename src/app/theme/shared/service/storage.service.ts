import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { Storage } from '@angular/fire/storage';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import {environment} from '../../../../environments/environment';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    private bucketUtilsUrl: string = environment.gcpRunBucketUtilsUrl;
    private apiUrl = environment.gcpCommAccApiUrl;
    private headers: any = {};
    private currentUser: any;
  constructor(
      private afStorage: AngularFireStorage,
      private authService: AuthenticationService,
      private http: HttpClient,
      private storage: Storage
      ) {
        this.currentUser = this.authService.getLocalClientData();
      }

    /**
     * Updates needed to call API
     * @param clientId
     */

    createBucket(clientId: string): Observable<any> {
        const bucketName = `comm-acc-client-${clientId.toLowerCase()}`;
        const body = {
            bucketName
        }
        return this.http.post<any>(`${this.apiUrl}/bucket/client/create`, body);
    }

    getFile(fileName: string, bucketName: string) {
    }

  listFiles(bucketName: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/bucket/list/small/${bucketName}`)
  }

  makeFileUploaderUrl(bucket: string, folder: string): string {
        return `${this.apiUrl}/bucket/upload/file/${bucket}/${folder}`
  }

  uploadFile(bucket: string, folder: string, file: any): Observable<any> {
        const url: string =  this.makeFileUploaderUrl(bucket, folder);
        return this.http.post<any>(url, file, {reportProgress: true, observe: 'events'} );
  }

}
