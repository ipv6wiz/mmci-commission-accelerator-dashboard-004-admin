import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ModalData } from '../dtos/modal-data.interface';
import { SafePipe } from '../helpers/pipes/safe.pipe';
import { StorageService } from '../../../service/storage.service';
import { NgOptimizedImage } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-file-display',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, SafePipe, NgOptimizedImage, PdfViewerModule],
  templateUrl: './file-display.component.html',
  styleUrl: './file-display.component.scss'
})
export class FileDisplayComponent implements OnInit, OnChanges {
  item: any;
  itemUrl: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private storageService: StorageService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('FileDisplayComponent - changes: ', changes)
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
