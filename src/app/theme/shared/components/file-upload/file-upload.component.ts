import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {Observable} from "rxjs";
import {StorageService} from "../../service/storage.service";
import {ApiResponse} from "../../dtos/api-response.dto";
import { NgIf, NgStyle } from '@angular/common';

@Component({
    standalone: true,
    imports: [
        NgStyle,
        NgIf
    ],
  selector: 'app-reg-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
    @Input() bucket: string = '';
    @Input() folder: string = '';
    @Input() newFileName: string = '';
    @Input() accept: string = '';
    @Input() ctrlName: string = '';
    @Input() title: string = '';
    @Output() fileUploaded = new EventEmitter<ApiResponse>();
    selectedFiles?: FileList;
    currentFile?: File;
    progress = 0;
    message = '';
    formId: string = '';

    constructor(private storageService: StorageService) {}

    ngOnInit() {
        console.log(`FileUploadComponent - bucket: ${this.bucket} folder: ${this.folder}`);
        this.formId = `${this.bucket}-${this.folder}`;
    }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }

    upload(event: any): void {
        this.progress = 0;
        console.log('upload - event: ', event);
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);
            if (file) {
                this.currentFile = file;
                console.log('upload - file: ', file);
                const formData: FormData = new FormData();
                formData.append('file', file);
                formData.append('newFileName', this.newFileName);
                formData.append('title', this.title);
                formData.append('ctrlName', this.ctrlName);
                this.storageService.uploadFile(this.bucket,this.folder,formData).subscribe({
                    next: (event: any) => {
                        console.log('upload - HttpEvent - event: ', event);
                        /**
                         * The request was sent out over the wire.
                        */
                        // Sent = 0,
                        /**
                         * An upload progress event was received.
                         */
                        // UploadProgress/ = 1,
                        /**
                         * The response status code and headers were received.
                         */
                        // ResponseHeader = 2,
                        /**
                         * A download progress event was received.
                         */
                        // DownloadProgress = 3,
                        /**
                         * The full response including the body was received.
                         */
                        // Response = 4,
                        /**
                         * A custom event from an interceptor or a backend.
                         */
                        // User = 5

                        switch(event.type) {
                            case HttpEventType.UploadProgress:
                                this.progress = Math.round(100 * event.loaded / event.total);
                                break;
                            case HttpEventType.Response:
                                event.body.data['ctrlName'] = this.ctrlName;
                                this.fileUploaded.emit(event.body);
                                break;
                        }
                    },
                    error: (err: any) => {
                        console.log(err);
                        this.progress = 0;

                        if (err.error && err.error.message) {
                            this.message = err.error.message;
                        } else {
                            this.message = 'Could not upload the file!';
                        }

                        this.fileUploaded.emit({
                            statusCode: 400,
                            msg: `${this.message} - Error uploading the file`
                        })

                        this.currentFile = undefined;
                    }
                });
            }
            this.selectedFiles = undefined;
        }
    }

}
