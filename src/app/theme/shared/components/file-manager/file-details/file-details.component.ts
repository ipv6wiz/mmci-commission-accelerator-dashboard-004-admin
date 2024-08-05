import {

  Component,
  effect, EffectRef, Input,

  OnChanges,
  OnInit,

  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FileItem} from "../dtos/file-item.interface";
import {newLeaf} from "../signals/file-item.signal";
import {
  MatTable, MatTableModule
} from "@angular/material/table";
import { Subject} from "rxjs";
import { MatDialog } from '@angular/material/dialog';
import { FileDisplayComponent } from '../file-display/file-display.component';
import { HelpersService } from '../../../service/helpers.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-file-details',
  standalone: true,
  imports: [
    MatTableModule,
    MatTooltip
  ],
  templateUrl: './file-details.component.html',
  styleUrl: './file-details.component.scss'
})
export class FileDetailsComponent implements OnChanges, OnInit {
  @Input() clientId: string = '';
  @Input() docInfo: any;
  @Input() bucket: string = '';
  @Input() fmType: string = 'admin';
  @ViewChild('fileDetails') fileDetailsTable!: MatTable<any>;
  files: FileItem[] = [];
  newFile: EffectRef;
  verifyStatus: any[] = [
    { // 0
      status: 'Processing',
      hint: 'File Action needed',
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
      hint: 'File checked and deemed acceptable',
      icon: 'bi-clipboard2-check-fill',
      iconColor: 'darkgreen'
    },
    { // 5
      status: 'Reject',
      hint: 'File checked and deemed unacceptable',
      icon: 'bi-clipboard2-x-fill',
      iconColor: 'red'
    },
    { // 6
      status: 'Request New File',
      hint: 'File checked & new file requested',
      icon: 'bi-info-circle-fill',
      iconColor: 'orange'
    }
  ];

  private filesSubject = new Subject<FileItem[]>();
  dataSource$ = this.filesSubject.asObservable();

  columnsToDisplay: string[] = [];
  columnNamesToDisplay: string[] = [];

  constructor(
    public modal: MatDialog,
    private helpers: HelpersService
    ) {

    this.newFile = effect(() => {
      const nf = newLeaf();
      console.log('FileDetailsComponent - newLeaf effect - nf: ', nf);
      this.files = nf;
      console.log('FileDetailsComponent - newLeaf effect - files: ', this.files)
    });

  }

  openFileDisplayModal(fileItem: FileItem) {
    this.modal.open(FileDisplayComponent, {
      data: {
        docInfo: this.docInfo,
        bucket: this.bucket,
        clientId: this.clientId,
        fileItem
      },
      maxWidth:900,
      minWidth: 300,
      maxHeight: 800,
      id: 'file-details-display-modal'
    })
  }

  ngOnInit() {
    if(this.fmType === 'admin') {
      this.columnsToDisplay = ['status', 'name', 'size'];
    } else {
      this.columnsToDisplay = ['name'];
    }
    console.log('FileDetailsComponent - ngOnInit ');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('FileDetailsComponent - ngOnChanges - changes: ', changes);

  }

}
