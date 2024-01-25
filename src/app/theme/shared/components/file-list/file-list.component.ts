import {Component, DoCheck, Input, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared.module";
import {DxFileManagerComponent, DxFileManagerModule} from "devextreme-angular";
import {FileItem} from "../../entities/file-item.class";
import {StorageService} from "../../service/storage.service";
import {AuthenticationService} from "../../service";
import {Observable, Subscription} from "rxjs";
import {BucketSmallListInterface} from "../../entities/bucket-small-list.interface";

@Component({
  selector: 'app-file-list',
  standalone: true,
    imports: [CommonModule, SharedModule, DxFileManagerModule],
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit, DoCheck{
    // @ts-ignore
    @ViewChild(DxFileManagerComponent, { static: false }) fileManager: DxFileManagerComponent;
    @Input() needRefresh!: Observable<boolean>;
    fileItems: FileItem[] = [];
    bucketName: string = '';
    clientData: any;
    bucketFileSubscription$!: Subscription;
    loading = true;
    constructor(private storageService: StorageService, private authService: AuthenticationService) {

    }

    ngOnInit() {
        this.getFileList();
        this.needRefresh.subscribe({
            next: (value) => {
                if(value) {
                    this.getFileList();
                }
            },
            error: (err) => {console.log('needRefresh - subscribe - error: ', err.message)}
        })
    }
    ngDoCheck() {
    }

    fmInit() {
        this.fileManager.instance.beginUpdate();
        this.loading = true;
    }

    toolbarClick(e:any) {
        console.log('toolbarClick - e: ', e);
        if(e.itemData === 'refresh') {
            this.getFileList();
        }
    }

    getFileList() {
        console.log('getFileList - called');
        // @TODO adjust to retrieve Client file list when needed
        this.clientData = this.authService.getLocalUserData();
        this.bucketName = this.clientData.bucket;
        this.bucketFileSubscription$ = this.storageService.listFiles(this.bucketName).subscribe(
            {
                next: (fileObj) => {
                    if(fileObj.statusCode === 200) {
                        if(!this.loading) {
                            this.fileManager.instance.beginUpdate();
                        }
                        this.fileItems = this.processFileList(fileObj.data.list);
                        console.log('fileItems: ', this.fileItems);
                        console.log('fileItems: ', JSON.stringify( this.fileItems));
                        // this.doRefresh();
                        this.fileManager.instance.endUpdate();
                        this.loading = false;
                    }
                },
                error: () => {console.log('getFileList - subscription - error' )}
            }
            );
    }

    doRefresh() {
        console.log('doRefresh called')
        this.fileManager.instance.refresh();
    }

    processFileList(files: BucketSmallListInterface[]): FileItem[] {
        // console.log('processFileList - files: ', files);
        // console.log('processFileList - typeof files: ', typeof files);
        // const bucketFiles: BucketSmallListInterface[] = files;
        // console.log('processFileList - typeof bucketFiles: ', typeof bucketFiles);
        let agg: any = {
            temp: []
        };
        files.forEach((item) => {
            item.path.split('/').reduce((agg, part: string, level: number, parts) => {
                // console.log('parts: ', parts);
                let filepart = parts[parts.length-1];
                if (!agg[part]) {
                    agg[part] = {
                        temp: []
                    };
                    const el: any = {
                        id: parts.slice(0, level + 1).join("/"),
                        name: parts.slice(level, level +1).join(''),
                        level: level + 1,
                        items: agg[part].temp
                    }
                    if(part === filepart && item.meta.size !== 0) {
                        el.size = item.meta.size;
                        el.isDirectory = false;
                        el.dateCreated = item.meta.timeCreated;
                    } else {
                        el.isDirectory = true;
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
