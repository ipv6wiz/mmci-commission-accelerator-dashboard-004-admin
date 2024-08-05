import {
  Component, effect,
  HostListener,
  Input,
  OnChanges, OnInit,
  SimpleChanges
} from '@angular/core';
import { MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import { NestedTreeControl} from "@angular/cdk/tree";
import {newLeaf} from "./signals/file-item.signal";

import {
  MatNestedTreeNode,
  MatTree, MatTreeNestedDataSource,
  MatTreeNode,
  MatTreeNodeDef, MatTreeNodeOutlet,
  MatTreeNodePadding,
  MatTreeNodeToggle
} from "@angular/material/tree";
import {MatProgressBar} from "@angular/material/progress-bar";
import {TreeNavService} from "./helpers/sidenav/tree-nav-service.class";

import {FileItem} from "./dtos/file-item.interface";
import {FolderContentComponent} from "./folder-content/folder-content.component";
import {FileDetailsComponent} from "./file-details/file-details.component";
import { StorageService } from '../../service/storage.service';
import { Observable } from 'rxjs';
import { fileVerifyStatusSignal } from './signals/file-verify-status.signal';
import { FileVerifyStatusDto } from './dtos/file-verify-status.dto';

@Component({
  selector: 'app-file-manager',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTree,
    MatTreeNode,
    MatProgressBar,
    MatTreeNodeDef,
    MatTreeNodePadding,
    MatTreeNodeToggle,
    MatNestedTreeNode,
    MatTreeNodeOutlet,
    FolderContentComponent,
    FileDetailsComponent,
  ],
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.scss'
})
export class FileManagerComponent implements OnChanges, OnInit{
  @Input() bucket: string = '';
  @Input() clientId: string = '';
  @Input() docInfo: any;
  @Input() needRefresh!: Observable<boolean>;
  @Input() fmType: string = 'admin';

  contentWidth: string = '800px';
  resizingEvent = {
    isResizing: false,
    startingCursorX: 0,
    startingWidth: 0,
  };

  treeControl = new NestedTreeControl<FileItem>(node => node.items);
  dataSource: MatTreeNestedDataSource<FileItem> = new MatTreeNestedDataSource<FileItem>();
  hasChild = (_: number, node: FileItem) => !!node.items && node.items.length > 0;
  isLeaf = (_: number, node: FileItem) => !!node.items && node.items.length === 0;

  constructor( private treeNavService: TreeNavService, private storageService: StorageService) {
    this.treeControl.dataNodes = [];
    this.treeControl.collapseAll();
    newLeaf.set([]); // using signals to pass data
  }

  async loadFileList(bucket: string = '') {
    if(bucket === '') {
      bucket = this.bucket;
    }
    this.dataSource.data = await this.storageService.getFileList(bucket);
    this.treeControl.expand(this.dataSource.data[0]);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('FileManagerComponent - ngOnChanges - changes: ', changes);
    this.loadFileList(changes['bucket'].currentValue).then();
  }

  ngOnInit() {
    console.debug('fileManagerComponent - ngOnInit');
    fileVerifyStatusSignal.set({action: 'test001'})
    if(this.fmType === 'admin') {
      this.contentWidth = '800px'
    } else {
      this.contentWidth = '350px';
    }
    this.loadFileList(this.bucket).then();
    this.needRefresh.subscribe({
      next: (value) => {
        if(value) {
          this.loadFileList(this.bucket).then();
        }
      },
      error: (err) => {console.log('needRefresh - subscribe - error: ', err.message)}
    })
  }

  toggleClick(event: any, node: any) {
    console.log('toggleClick - node: ', node);
    newLeaf.set([]); // using signals to pass data
    if(this.treeControl.isExpanded(node)) {
      console.log('>>>>>> node expanded');

      this.treeControl.collapse(node);
    } else {
      if(node.level === 0 && this.treeControl.dataNodes.length === 0) {
        this.treeControl.dataNodes.push(node);
      }
      // const dataNodes = this.treeControl.dataNodes;
      console.log('toggleClick - dataNodes: ', this.treeControl.dataNodes);
      this.collapseLevel(this.treeControl.dataNodes, node.level);
      console.log('toggleClick - after collapseLevel')
      this.treeControl.expand(node);
    }
  }

  collapseLevel(items: FileItem[], level: number) {
    for(let i = 0; i  < items.length; i++) {
      const levelToCheck = level === 0 ? 0 : level-1;
      if(items[i].level === levelToCheck) {
        items[i].items.forEach((item: FileItem) => {
          this.treeControl.collapseDescendants(item);
          this.treeControl.collapse(item);
        })
      } else {
        this.collapseLevel(items[i].items, level);
      }
    }
  }

  startResizing(event: MouseEvent): void {
    // console.log('startResizing - Mouse Down')
    this.resizingEvent = {
      isResizing: true,
      startingCursorX: event.clientX,
      startingWidth: this.treeNavService.treeNavWidth,
    };
  }

  @HostListener('window:mousemove', ['$event'])
  updateTreeNavWidth(event: MouseEvent) {

    // No need to even continue if we're not resizing
    if (!this.resizingEvent.isResizing) {
      return;
    }
    // console.log('updateTreeNavWidth - Mouse Move - resizingEvent: ', this.resizingEvent);
    // 1. Calculate how much mouse has moved on the x-axis
    const cursorDeltaX = event.clientX - this.resizingEvent.startingCursorX;

    // 2. Calculate the new width according to initial width and mouse movement
    const newWidth = this.resizingEvent.startingWidth + cursorDeltaX;

    // 3. Set the new width
    this.treeNavService.setTreeNavWidth(newWidth);
  }

  @HostListener('window:mouseup')
  stopResizing() {
    // console.log('stopResizing - Mouse Up')
    this.resizingEvent.isResizing = false;
  }

}
