import {

  Component,
  effect, EffectRef,

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
import { detailsLostFocus } from '../signals/details-lost-focus.signal';

@Component({
  selector: 'app-file-details',
  standalone: true,
  imports: [
    MatTableModule,
  ],
  templateUrl: './file-details.component.html',
  styleUrl: './file-details.component.scss'
})
export class FileDetailsComponent implements OnChanges, OnInit {
  @ViewChild('fileDetails') fileDetailsTable!: MatTable<any>;
  files: FileItem[] = [];
  newFile: EffectRef;
  detailsFocus: EffectRef;

  private filesSubject = new Subject<FileItem[]>();
  dataSource$ = this.filesSubject.asObservable();

  columnsToDisplay: string[] = ['name', 'size'];
  columnNamesToDisplay: string[] = [];

  constructor(public modal: MatDialog) {
    this.newFile = effect(() => {
      const nf = newLeaf();
      console.log('FileDetailsComponent - newLeaf effect - nf: ', nf);
      this.files = nf;
      console.log('FileDetailsComponent - newLeaf effect - files: ', this.files)
    });
    this.detailsFocus = effect(() => {
      const focusState = detailsLostFocus();
      console.log('FileDetailsComponent - focusState: ', focusState);
      if(focusState === 'lost') {
        console.log('=======> WOULD HAVE CLOSED THE DIALOG <==========')
        // this.modal.closeAll();
      }
    });
  }

  openFileDisplayModal(fileItem: FileItem) {
    // console.log('openFileDisplayModal - item.bucket: ', fileItem.downloadLink);

    this.modal.open(FileDisplayComponent, {
      data: {
        fileItem
      },
      maxWidth:900,
      minHeight: 300,
      maxHeight: 800,
      minWidth: 300,
      closeOnNavigation: true,
      autoFocus: 'first-tabbable',
      id: 'file-details-display-modal'
    })
  }

  ngOnInit() {
    console.log('FileDetailsComponent - ngOnInit ');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('FileDetailsComponent - ngOnChanges - changes: ', changes);

  }

}
