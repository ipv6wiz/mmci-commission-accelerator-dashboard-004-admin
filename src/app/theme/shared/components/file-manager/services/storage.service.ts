import {Injectable} from "@angular/core";
import {BucketSmallListInterface} from "../dtos/bucket-small-list.interface";
import {FileItem} from "../dtos/file-item.interface";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  fileItems: FileItem[] = [];
  fileObj = {
    "statusCode": 200,
    "msg": "List of files in bucket",
    "ver": "0.0.453",
    "data": {
      "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
      "list": [
        {
          "name": "dre-license/CA-DRE-License.pdf",
          "path": "dre-license/CA-DRE-License.pdf",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/dre-license/CA-DRE-License.pdf/1706485680182012",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/dre-license%2FCA-DRE-License.pdf",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/dre-license%2FCA-DRE-License.pdf?generation=1706485680182012&alt=media",
            "name": "dre-license/CA-DRE-License.pdf",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485680182012",
            "metageneration": "1",
            "contentType": "application/pdf",
            "storageClass": "STANDARD",
            "size": "458061",
            "md5Hash": "ysH5Qrv14TvkChKZTUdt6g==",
            "crc32c": "osneAw==",
            "etag": "CPyloMaigYQDEAE=",
            "timeCreated": "2024-01-28T23:48:00.275Z",
            "updated": "2024-01-28T23:48:00.275Z",
            "timeStorageClassUpdated": "2024-01-28T23:48:00.275Z"
          }
        },
        {
          "name": "drivers-license/CA-Drivers-License-Back.jpg",
          "path": "drivers-license/CA-Drivers-License-Back.jpg",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/drivers-license/CA-Drivers-License-Back.jpg/1706485702891867",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/drivers-license%2FCA-Drivers-License-Back.jpg",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/drivers-license%2FCA-Drivers-License-Back.jpg?generation=1706485702891867&alt=media",
            "name": "drivers-license/CA-Drivers-License-Back.jpg",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485702891867",
            "metageneration": "1",
            "contentType": "image/jpeg",
            "storageClass": "STANDARD",
            "size": "264248",
            "md5Hash": "SV3yf/Jwxia3EV0C96Z3rA==",
            "crc32c": "0wi0PQ==",
            "etag": "CNuyitGigYQDEAE=",
            "timeCreated": "2024-01-28T23:48:22.986Z",
            "updated": "2024-01-28T23:48:22.986Z",
            "timeStorageClassUpdated": "2024-01-28T23:48:22.986Z"
          }
        },
        {
          "name": "drivers-license/CA-Drivers-License-Front.jpg",
          "path": "drivers-license/CA-Drivers-License-Front.jpg",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/drivers-license/CA-Drivers-License-Front.jpg/1706485691182211",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/drivers-license%2FCA-Drivers-License-Front.jpg",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/drivers-license%2FCA-Drivers-License-Front.jpg?generation=1706485691182211&alt=media",
            "name": "drivers-license/CA-Drivers-License-Front.jpg",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485691182211",
            "metageneration": "1",
            "contentType": "image/jpeg",
            "storageClass": "STANDARD",
            "size": "2091087",
            "md5Hash": "4iyC094/F8OKGTTE0UMWNQ==",
            "crc32c": "Gq608w==",
            "etag": "CIPZv8uigYQDEAE=",
            "timeCreated": "2024-01-28T23:48:11.276Z",
            "updated": "2024-01-28T23:48:11.276Z",
            "timeStorageClassUpdated": "2024-01-28T23:48:11.276Z"
          }
        },
        {
          "name": "prod-report/12-month-production-report-from-MLS.pdf",
          "path": "prod-report/12-month-production-report-from-MLS.pdf",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/prod-report/12-month-production-report-from-MLS.pdf/1706485668986507",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf?generation=1706485668986507&alt=media",
            "name": "prod-report/12-month-production-report-from-MLS.pdf",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485668986507",
            "metageneration": "1",
            "contentType": "application/pdf",
            "storageClass": "STANDARD",
            "size": "194286",
            "md5Hash": "OPzXgCe5rEiM5+GpNAHlXA==",
            "crc32c": "oqI27g==",
            "etag": "CIv99MCigYQDEAE=",
            "timeCreated": "2024-01-28T23:47:49.081Z",
            "updated": "2024-01-28T23:47:49.081Z",
            "timeStorageClassUpdated": "2024-01-28T23:47:49.081Z"
          }
        },
        {
          "name": "prod-report/x1-12-month-production-report-from-MLS.pdf",
          "path": "prod-report/x1-12-month-production-report-from-MLS.pdf",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/prod-report/12-month-production-report-from-MLS.pdf/1706485668986507",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf?generation=1706485668986507&alt=media",
            "name": "prod-report/12-month-production-report-from-MLS.pdf",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485668986507",
            "metageneration": "1",
            "contentType": "application/pdf",
            "storageClass": "STANDARD",
            "size": "194286",
            "md5Hash": "OPzXgCe5rEiM5+GpNAHlXA==",
            "crc32c": "oqI27g==",
            "etag": "CIv99MCigYQDEAE=",
            "timeCreated": "2024-01-28T23:47:49.081Z",
            "updated": "2024-01-28T23:47:49.081Z",
            "timeStorageClassUpdated": "2024-01-28T23:47:49.081Z"
          }
        },
        {
          "name": "prod-report/x2-12-month-production-report-from-MLS.pdf",
          "path": "prod-report/x2-12-month-production-report-from-MLS.pdf",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/prod-report/12-month-production-report-from-MLS.pdf/1706485668986507",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf?generation=1706485668986507&alt=media",
            "name": "prod-report/12-month-production-report-from-MLS.pdf",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485668986507",
            "metageneration": "1",
            "contentType": "application/pdf",
            "storageClass": "STANDARD",
            "size": "194286",
            "md5Hash": "OPzXgCe5rEiM5+GpNAHlXA==",
            "crc32c": "oqI27g==",
            "etag": "CIv99MCigYQDEAE=",
            "timeCreated": "2024-01-28T23:47:49.081Z",
            "updated": "2024-01-28T23:47:49.081Z",
            "timeStorageClassUpdated": "2024-01-28T23:47:49.081Z"
          }
        },
        {
          "name": "prod-report/x3-12-month-production-report-from-MLS.pdf",
          "path": "prod-report/x3-12-month-production-report-from-MLS.pdf",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/prod-report/12-month-production-report-from-MLS.pdf/1706485668986507",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf?generation=1706485668986507&alt=media",
            "name": "prod-report/12-month-production-report-from-MLS.pdf",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485668986507",
            "metageneration": "1",
            "contentType": "application/pdf",
            "storageClass": "STANDARD",
            "size": "194286",
            "md5Hash": "OPzXgCe5rEiM5+GpNAHlXA==",
            "crc32c": "oqI27g==",
            "etag": "CIv99MCigYQDEAE=",
            "timeCreated": "2024-01-28T23:47:49.081Z",
            "updated": "2024-01-28T23:47:49.081Z",
            "timeStorageClassUpdated": "2024-01-28T23:47:49.081Z"
          }
        },
        {
          "name": "prod-report/x4-12-month-production-report-from-MLS.pdf",
          "path": "prod-report/x4-12-month-production-report-from-MLS.pdf",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/prod-report/12-month-production-report-from-MLS.pdf/1706485668986507",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf?generation=1706485668986507&alt=media",
            "name": "prod-report/12-month-production-report-from-MLS.pdf",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485668986507",
            "metageneration": "1",
            "contentType": "application/pdf",
            "storageClass": "STANDARD",
            "size": "194286",
            "md5Hash": "OPzXgCe5rEiM5+GpNAHlXA==",
            "crc32c": "oqI27g==",
            "etag": "CIv99MCigYQDEAE=",
            "timeCreated": "2024-01-28T23:47:49.081Z",
            "updated": "2024-01-28T23:47:49.081Z",
            "timeStorageClassUpdated": "2024-01-28T23:47:49.081Z"
          }
        },
        {
          "name": "prod-report/x5-12-month-production-report-from-MLS.pdf",
          "path": "prod-report/x5-12-month-production-report-from-MLS.pdf",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/prod-report/12-month-production-report-from-MLS.pdf/1706485668986507",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf?generation=1706485668986507&alt=media",
            "name": "prod-report/12-month-production-report-from-MLS.pdf",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485668986507",
            "metageneration": "1",
            "contentType": "application/pdf",
            "storageClass": "STANDARD",
            "size": "194286",
            "md5Hash": "OPzXgCe5rEiM5+GpNAHlXA==",
            "crc32c": "oqI27g==",
            "etag": "CIv99MCigYQDEAE=",
            "timeCreated": "2024-01-28T23:47:49.081Z",
            "updated": "2024-01-28T23:47:49.081Z",
            "timeStorageClassUpdated": "2024-01-28T23:47:49.081Z"
          }
        },
        {
          "name": "prod-report/x6-12-month-production-report-from-MLS.pdf",
          "path": "prod-report/x6-12-month-production-report-from-MLS.pdf",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/prod-report/12-month-production-report-from-MLS.pdf/1706485668986507",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf?generation=1706485668986507&alt=media",
            "name": "prod-report/12-month-production-report-from-MLS.pdf",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485668986507",
            "metageneration": "1",
            "contentType": "application/pdf",
            "storageClass": "STANDARD",
            "size": "194286",
            "md5Hash": "OPzXgCe5rEiM5+GpNAHlXA==",
            "crc32c": "oqI27g==",
            "etag": "CIv99MCigYQDEAE=",
            "timeCreated": "2024-01-28T23:47:49.081Z",
            "updated": "2024-01-28T23:47:49.081Z",
            "timeStorageClassUpdated": "2024-01-28T23:47:49.081Z"
          }
        },
        {
          "name": "prod-report/x7-12-month-production-report-from-MLS.pdf",
          "path": "prod-report/x7-12-month-production-report-from-MLS.pdf",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/prod-report/12-month-production-report-from-MLS.pdf/1706485668986507",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf?generation=1706485668986507&alt=media",
            "name": "prod-report/12-month-production-report-from-MLS.pdf",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485668986507",
            "metageneration": "1",
            "contentType": "application/pdf",
            "storageClass": "STANDARD",
            "size": "194286",
            "md5Hash": "OPzXgCe5rEiM5+GpNAHlXA==",
            "crc32c": "oqI27g==",
            "etag": "CIv99MCigYQDEAE=",
            "timeCreated": "2024-01-28T23:47:49.081Z",
            "updated": "2024-01-28T23:47:49.081Z",
            "timeStorageClassUpdated": "2024-01-28T23:47:49.081Z"
          }
        },
        {
          "name": "prod-report/x8-12-month-production-report-from-MLS.pdf",
          "path": "prod-report/x8-12-month-production-report-from-MLS.pdf",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/prod-report/12-month-production-report-from-MLS.pdf/1706485668986507",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf?generation=1706485668986507&alt=media",
            "name": "prod-report/12-month-production-report-from-MLS.pdf",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485668986507",
            "metageneration": "1",
            "contentType": "application/pdf",
            "storageClass": "STANDARD",
            "size": "194286",
            "md5Hash": "OPzXgCe5rEiM5+GpNAHlXA==",
            "crc32c": "oqI27g==",
            "etag": "CIv99MCigYQDEAE=",
            "timeCreated": "2024-01-28T23:47:49.081Z",
            "updated": "2024-01-28T23:47:49.081Z",
            "timeStorageClassUpdated": "2024-01-28T23:47:49.081Z"
          }
        },
        {
          "name": "prod-report/x9-12-month-production-report-from-MLS.pdf",
          "path": "prod-report/x9-12-month-production-report-from-MLS.pdf",
          "meta": {
            "kind": "storage#object",
            "id": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/prod-report/12-month-production-report-from-MLS.pdf/1706485668986507",
            "selfLink": "https://www.googleapis.com/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf",
            "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3/o/prod-report%2F12-month-production-report-from-MLS.pdf?generation=1706485668986507&alt=media",
            "name": "prod-report/12-month-production-report-from-MLS.pdf",
            "bucket": "comm-acc-client-jwdtzybketg5vgsrpjeksktycrc3",
            "generation": "1706485668986507",
            "metageneration": "1",
            "contentType": "application/pdf",
            "storageClass": "STANDARD",
            "size": "194286",
            "md5Hash": "OPzXgCe5rEiM5+GpNAHlXA==",
            "crc32c": "oqI27g==",
            "etag": "CIv99MCigYQDEAE=",
            "timeCreated": "2024-01-28T23:47:49.081Z",
            "updated": "2024-01-28T23:47:49.081Z",
            "timeStorageClassUpdated": "2024-01-28T23:47:49.081Z"
          }
        },
      ]
    }
  }

  getFileList(): FileItem[] {
    this.fileItems = this.processFileList(this.fileObj.data.list);
    console.log('getFileList - fileItems: ', this.fileItems);
    const rootItem: FileItem = {
      level: 0,
      expanded: false,
      folder: '/',
      name: '/',
      id: 'root',
      isDirectory: true,
      verifyStatus: 1,
      items: this.fileItems
    }
    return [rootItem];
  }

  processFileList(files: BucketSmallListInterface[]): FileItem[] {
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
}
