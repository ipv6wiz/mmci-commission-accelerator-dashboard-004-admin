import {Component,  Input, OnChanges,  SimpleChanges,} from '@angular/core';
import {FileItem} from "../dtos/file-item.interface";
import {newLeaf} from "../signals/file-item.signal";

@Component({
  selector: 'app-folder-content',
  standalone: true,
  imports: [],
  templateUrl: './folder-content.component.html',
  styleUrl: './folder-content.component.scss'
})
export class FolderContentComponent implements  OnChanges{
  @Input() leaf!: FileItem;
  @Input() clientId!: string;

  ngOnChanges(changes: SimpleChanges) {

    newLeaf.update((files: FileItem[]) => {
      console.log('FolderContentComponent - ngOnChanges - changes: ', changes);
      console.log('FolderContentComponent - newLeaf - update - before - files: ', files);
      if(files.length > 0) {
        if(files[0].folder !== this.leaf.folder) {
          files = []
        }
      }
      files.push(this.leaf);
      return files;
    });
    console.log('FolderContentComponent - newLeaf - update - after - files: ', newLeaf());
  }

}
