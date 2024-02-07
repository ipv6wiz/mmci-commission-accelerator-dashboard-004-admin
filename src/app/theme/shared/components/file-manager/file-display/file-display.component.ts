import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ModalData } from '../dtos/modal-data.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '../helpers/pipes/safe.pipe';
import { StorageService } from '../../../service/storage.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-file-display',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, SafePipe, NgOptimizedImage],
  templateUrl: './file-display.component.html',
  styleUrl: './file-display.component.scss'
})
export class FileDisplayComponent implements OnInit {
  item: any;
  itemUrl: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private sanitizer: DomSanitizer,
    private storageService: StorageService
  ) {

  }

  ngOnInit() {
    console.log('FileDisplayComponent - ngOnInit')
    if(this.data.fileItem.downloadLink !== undefined) {
      console.log('FileDisplayComponent - ngOnInit downloadLink: ', this.data.fileItem.downloadLink);
      // const link = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.fileItem.downloadLink);
      const link = this.data.fileItem.downloadLink;
      this.storageService.getFileFromLink(link).subscribe({
        next: (item) => {
          // this.item = this.sanitizer.bypassSecurityTrustResourceUrl(item);
          console.log('FileDisplayComponent - getFileFromLink - item: ', item);
          const arrayBufferView = new Uint8Array(item);
          const blob = new Blob([arrayBufferView], {type: "image/jpg"});
          const urlCreator =  window.URL || window.webkitURL;
          this.itemUrl = urlCreator.createObjectURL( blob );
        },
        error: (err) => {
          console.log('FileDisplayComponent - getFileFromLink - error: ', err)
        }
      })
    }
  }

}
