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
  @Input() clientId: string = '';
  @Input() docInfo: any;
  @Input() bucket: string = '';
  @ViewChild('fileDetails') fileDetailsTable!: MatTable<any>;
  files: FileItem[] = [];
  newFile: EffectRef;


  private filesSubject = new Subject<FileItem[]>();
  dataSource$ = this.filesSubject.asObservable();

  columnsToDisplay: string[] = ['name', 'size'];
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
    // const folderProp = this.helpers.convertToCamelCase(fileItem.folder);

    this.modal.open(FileDisplayComponent, {
      data: {
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
    console.log('FileDetailsComponent - ngOnInit ');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('FileDetailsComponent - ngOnChanges - changes: ', changes);

  }

}
