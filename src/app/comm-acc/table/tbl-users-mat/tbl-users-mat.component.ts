import { AfterViewChecked, Component, effect, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';
import { dataGridRefreshSignal } from '../../../theme/shared/signals/data-grid-refresh.signal';
import { UsersService } from '../../../theme/shared/service/users.service';
import { ListWithCountDto } from '../../../theme/shared/dtos/list-with-count.dto';
import { UserDto } from '../../../theme/shared/dtos/user.dto';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { NestedColumnPipe } from '../../../theme/shared/pipes/nested-column.pipe';
import { NgxMaskPipe } from 'ngx-mask';
import { MatBoolDisplayPipe } from '../../../theme/shared/pipes/mat-bool-display.pipe';
import { NgStyle } from '@angular/common';
import { TblUsersDialogFormMatComponent } from './tbl-users-dialog-form-mat/tbl-users-dialog-form-mat.component';

@Component({
  selector: 'app-tbl-users-mat',
  standalone: true,
  imports: [
    CardComponent,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconButton,
    MatPaginator,
    MatProgressSpinner,
    MatRow,
    MatRowDef,
    MatTable,
    MatToolbar,
    MatTooltip,
    NestedColumnPipe,
    NgxMaskPipe,
    MatHeaderCellDef,
    MatBoolDisplayPipe,
    NgStyle
  ],
  templateUrl: './tbl-users-mat.component.html',
  styleUrl: './tbl-users-mat.component.scss'
})
export class TblUsersMatComponent implements OnInit, AfterViewChecked{
  @ViewChild('paginator') paginator!: MatPaginator;
  loadingItems: boolean = true;
  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  public loadSpinnerDiameter: string = '50';
  tableTitle: string = 'Users (Not Clients)';
  tableItemName: string = 'User';
  dataSource!: MatTableDataSource<UserDto>;
  dataTypeTag: string = 'users';
  totalItemsCount: number = 0;
  columnsToDisplay: string[] = ['photoURL', 'displayName', 'email', 'emailVerified', 'lastLogin', 'roles' ];
  columnsToDisplayWithActions: string[] = [...this.columnsToDisplay, 'actions'];
  columnNamesToDisplay: string[] = ['Photo Url', 'Display Name', 'Email', 'Email Verified', 'Last Login', 'Roles'];
  columnsConfig: Map<string, any> = new Map<string, any>([
    ['photoURL', {type: 'image', alt: 'Profile Picture'}],
    ['emailVerified', {type: 'boolean'}]
  ]);

  constructor(
    public modal: MatDialog,
    private logger: NGXLogger,
    private service: UsersService
  ) {
    effect(() => {
      const dgrs = dataGridRefreshSignal();
      if(dgrs.refresh && dgrs.dataType === this.dataTypeTag) {
        this.refreshItemsList().then();
      }
    });
  }

  async ngOnInit() {
    await this.refreshItemsList();
  }

  ngAfterViewChecked() {
    if(!this.loadingItems && !this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async refreshItemsList() {
    this.loadingItems = true;
    const itemsDataObj: ListWithCountDto = await this.loadItemsData();
    this.totalItemsCount = itemsDataObj.count;
    this.dataSource = new MatTableDataSource<UserDto>(itemsDataObj.items);
    this.loadingItems = false;
  }

  async loadItemsData(): Promise<ListWithCountDto> {
    return  await this.service.loadAllItems();
  }

  openItemUpdateFormModal(item: UserDto, index: number) {
    this.modal.open(TblUsersDialogFormMatComponent, {
      data: {
        type: 'update',
        dataType: this.dataTypeTag,
        item,
        index
      }
    });
  }

  openItemCreateFormModal() {
    this.modal.open(TblUsersDialogFormMatComponent, {
      data: {
        type: 'new',
        dataType: this.dataTypeTag
      }
    });
  }

  addItem() {
    this.openItemCreateFormModal();
  }

  editItem(event: any, item: UserDto) {
    const index: number = this.dataSource.data.findIndex((ecItem: UserDto) => item.uid === ecItem.uid);
    this.openItemUpdateFormModal(item, index);
  }

  onPageEvent(event: any) {
    console.log('onPageEvent - event: ', event);
    console.log('onPageEvent - dataSource - paginator: ', this.dataSource.paginator)
  }

}
