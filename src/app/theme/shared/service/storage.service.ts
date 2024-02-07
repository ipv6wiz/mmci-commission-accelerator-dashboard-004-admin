import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { FileItem } from '../components/file-manager/dtos/file-item.interface';
import { BucketSmallListInterface } from '../components/file-manager/dtos/bucket-small-list.interface';
import { ApiResponse } from '../dtos/api-response.dto';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private apiUrl = environment.gcpCommAccApiUrl;

  constructor(private http: HttpClient) {}

   async getFileList(bucket: string): Promise<FileItem[]> {
    const fileObj = await lastValueFrom(
      this.listFiles(bucket),
      {defaultValue: {statusCode: 400, msg: 'Default Value - should never be seen', data: null}});
    const fileItems: FileItem[] = this.processFileList(fileObj.data.list, bucket);
    console.log('getFileList - fileItems: ', fileItems);
    const rootItem: FileItem = {
      level: 0,
      expanded: false,
      name: '/',
      id: 'root',
      isDirectory: true,
      items: fileItems
    }
    return [rootItem];
  }

  private makeDownloadLink(bucketName: string, folderName: string, fileName: string): string {
    return `${this.apiUrl}bucket/download/file/${bucketName}/${folderName}/${fileName}?format=raw`;
  }

  private processFileList(files: BucketSmallListInterface[], bucket: string): FileItem[] {
    // console.log('processFileList - files: ', files);
    // console.log('processFileList - typeof files: ', typeof files);
    // const bucketFiles: BucketSmallListInterface[] = files;
    // console.log('processFileList - typeof bucketFiles: ', typeof bucketFiles);
    const agg: any = {
      temp: []
    };
    files.forEach((item) => {
      item.path.split('/').reduce((agg, part: string, level: number, parts) => {
        // console.log('parts: ', parts);
        const filePart = parts[parts.length-1];
        if (!agg[part]) {
          agg[part] = {
            temp: []
          };
          const el: any = {
            id: parts.slice(0, level + 1).join("/"),
            name: parts.slice(level, level +1).join(''),
            folder: parts[0],
            level: level + 1,
            items: agg[part].temp
          }
          if(part === filePart && item.meta.size !== 0) {
            el.size = item.meta.size;
            el.isDirectory = false;
            el.dateCreated = item.meta.timeCreated;
            el.meta = item.meta;
            el.fileType = el.name.split('.')[1];
            el.downloadLink = this.makeDownloadLink(bucket, el.folder, el.name);
          } else {
            el.isDirectory = true;
            el.expanded = false;
          }
          agg.temp.push(el);
          // console.log(agg)
        }
        return agg[part];
      }, agg)
    });
    return agg.temp;
  }

  createBucket(clientId: string): Observable<any> {
    const bucketName = `comm-acc-client-${clientId.toLowerCase()}`;
    const body = {
      bucketName
    }
    return this.http.post<any>(`${this.apiUrl}bucket/client/create`, body);
  }

  getFile(bucketName: string, folderName: string, fileName: string, ): Observable<any> {
    console.log(`${bucketName}/${folderName}/${fileName}`);
    return this.http.get<any>(this.makeDownloadLink(bucketName, folderName, fileName));
  }

  getFileFromLink(link: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({'Accept': 'image/*'})
    // @ts-expect-error because of options
    return this.http.get<any>(link, {headers: headers, responseType: 'arraybuffer'});
  }

  listFiles(bucketName: string): Observable<ApiResponse> {
    return this.http.get<any>(`${this.apiUrl}bucket/list/small/${bucketName}`)
  }

  makeFileUploaderUrl(bucket: string, folder: string): string {
    return `${this.apiUrl}bucket/upload/file/${bucket}/${folder}`
  }

  uploadFile(bucket: string, folder: string, file: any): Observable<any> {
    const url: string =  this.makeFileUploaderUrl(bucket, folder);
    return this.http.post<any>(url, file, {reportProgress: true, observe: 'events'} );
  }

}
