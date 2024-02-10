import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,

} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ModalData } from '../dtos/modal-data.interface';
import { SafePipe } from '../helpers/pipes/safe.pipe';
import { StorageService } from '../../../service/storage.service';
import { NgOptimizedImage } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButton } from '@angular/material/button';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { FileItem } from '../dtos/file-item.interface';
import { fileVerifyStatusSignal } from '../signals/file-verify-status.signal';

@Component({
  selector: 'app-file-display',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, SafePipe, NgOptimizedImage, PdfViewerModule, MatDialogClose, MatButton, CdkTrapFocus, MatToolbar, MatTooltip],
  templateUrl: './file-display.component.html',
  styleUrl: './file-display.component.scss'
})
export class FileDisplayComponent implements OnInit, OnChanges {
  item: any;
  itemUrl: any;
  verifyStatus: any[] = [
    { // 0
      status: 'Processing',
      hint: 'Verification item being processed',
      icon: 'bi-clipboard2-pulse-fill',
      iconColor: 'cornflowerblue'
    },
    { // 1
      status: 'Auto Accept',
      hint: 'Client entered data exactly matches research data',
      icon: 'bi-check-circle-fill',
      iconColor: 'darkgreen'
    },
    { // 2
      status: 'Auto Warn',
      hint: 'Client entered data almost matches research data, check & Override',
      icon: 'bi-exclamation-triangle-fill',
      iconColor: 'orange'
    },
    { // 3
      status: 'Auto Reject',
      hint: 'Client entered data does not match research data, check & override',
      icon: 'bi-x-circle-fill',
      iconColor: 'red'
    },
    { // 4
      status: 'Accept',
      hint: 'Data checked and deemed acceptable',
      icon: 'bi-clipboard2-check-fill',
      iconColor: 'darkgreen'
    },
    { // 5
      status: 'Reject',
      hint: 'Data checked and deemed unacceptable',
      icon: 'bi-clipboard2-x-fill',
      iconColor: 'red'
    },
    { // 6
      status: 'Request New File',
      hint: 'Data checked & more information requested',
      icon: 'bi-info-circle-fill',
      iconColor: 'orange'
    }
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private storageService: StorageService,
    public modal: MatDialog,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('FileDisplayComponent - changes: ', changes)
  }

  acceptRejectRequestBtnClick(event: any, kind: string, item: FileItem) {
    fileVerifyStatusSignal.set({action: kind, item});
  }

  itemDisable(btn: string, item: any): boolean {
    if(btn == 'accept') {
      return item['verifyStatus'] === 1 || item['verifyStatus'] === 4;
    } else if(btn === 'reject') {
      return item['verifyStatus'] === 3 || item['verifyStatus'] === 5;
    } else if(btn === 'request') {
      return false;
    }
    return false;
  }

  ngOnInit() {
    console.log('FileDisplayComponent - ngOnInit')
    if(this.data.fileItem.downloadLink !== undefined) {
      console.log('FileDisplayComponent - ngOnInit downloadLink: ', this.data.fileItem.downloadLink);
      const link = this.data.fileItem.downloadLink;
      this.storageService.getFileFromLink(link).subscribe({
        next: (item) => {
          console.log('FileDisplayComponent - getFileFromLink - item: ', item);
          const arrayBufferView = new Uint8Array(item);
          if(this.data.fileItem.fileType === 'pdf') {
            this.item = arrayBufferView;
          } else {
            const blob = new Blob([arrayBufferView], {type: "image/jpg"});
            const urlCreator =  window.URL || window.webkitURL;
            this.itemUrl = urlCreator.createObjectURL( blob );
          }
        },
        error: (err) => {
          console.log('FileDisplayComponent - getFileFromLink - error: ', err)
        }
      })
    }
  }

}
