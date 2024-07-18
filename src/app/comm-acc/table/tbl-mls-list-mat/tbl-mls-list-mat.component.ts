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
import { MlsListDto } from '../../../theme/shared/dtos/mls-list.dto';
import { MatDialog } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';
import { MlsListService } from '../../../theme/shared/service/mls-list.service';
import { dataGridRefreshSignal } from '../../../theme/shared/signals/data-grid-refresh.signal';
import { ListWithCountDto } from '../../../theme/shared/dtos/list-with-count.dto';
import { TblMlsListFormMatComponent } from './tbl-mls-list-form-mat/tbl-mls-list-form-mat.component';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { NestedColumnPipe } from '../../../theme/shared/pipes/nested-column.pipe';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-tbl-mls-list-mat',
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
    MatHeaderCellDef
  ],
  templateUrl: './tbl-mls-list-mat.component.html',
  styleUrl: './tbl-mls-list-mat.component.scss'
})
export class TblMlsListMatComponent implements OnInit, AfterViewChecked {
  @ViewChild('paginator') paginator!: MatPaginator;
  loadingItems: boolean = true;
  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  public loadSpinnerDiameter: string = '50';
  tableTitle: string = 'MLS List';
  tableItemName: string = 'MLS List Item';
  dataSource!: MatTableDataSource<MlsListDto>;
  dataTypeTag: string = 'mlsList';
  totalItemsCount: number = 0;
  columnsToDisplay: string[] = ['mlsName'];
  columnsToDisplayWithActions: string[] = [...this.columnsToDisplay, 'actions'];
  columnNamesToDisplay: string[] = ['MLS Name'];
  columnsConfig: Map<string, any> = new Map<string, any>();

  constructor(
    public modal: MatDialog,
    private logger: NGXLogger,
    private service: MlsListService
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
    this.dataSource = new MatTableDataSource<MlsListDto>(itemsDataObj.items);
    this.loadingItems = false;
  }

  async loadItemsData(): Promise<ListWithCountDto> {
    return  await this.service.loadAllItems();
  }

  openItemUpdateFormModal(item: MlsListDto, index: number) {
    this.modal.open(TblMlsListFormMatComponent, {
      data: {
        type: 'update',
        dataType: this.dataTypeTag,
        item,
        index
      }
    });
  }

  openItemCreateFormModal() {
    this.modal.open(TblMlsListFormMatComponent, {
      data: {
        type: 'new',
        dataType: this.dataTypeTag,
      }
    });
  }

  addItem() {
    this.openItemCreateFormModal();
  }

  editItem(event: any, item: MlsListDto) {
    const index: number = this.dataSource.data.findIndex((ecItem: MlsListDto) => item.mlsName === ecItem.mlsName);
    this.openItemUpdateFormModal(item, index);
  }

  onPageEvent(event: any) {
    console.log('onPageEvent - event: ', event);
    console.log('onPageEvent - dataSource - paginator: ', this.dataSource.paginator)
  }

}
