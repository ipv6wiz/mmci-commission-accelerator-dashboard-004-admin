import { AfterViewChecked, Component, effect, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { EscrowCompanyDto } from '../../../theme/shared/dtos/escrow-company.dto';
import { ListWithCountDto } from '../../../theme/shared/dtos/list-with-count.dto';
import { EscrowCompanyService } from '../../../theme/shared/service/escrow-company.service';
import { NGXLogger } from 'ngx-logger';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
import { TblEscrowCompanyFormMatComponent } from './tbl-escrow-company-form-mat/tbl-escrow-company-form-mat.component';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NestedColumnPipe } from '../../../theme/shared/pipes/nested-column.pipe';
import { dataGridRefreshSignal } from '../../../theme/shared/signals/data-grid-refresh.signal';

@Component({
  selector: 'app-tbl-escrow-companies-mat',
  standalone: true,
  imports: [
    CardComponent,
    MatProgressSpinner,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatTooltip,
    MatToolbar,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
    NgxMaskPipe,
    NestedColumnPipe
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './tbl-escrow-companies-mat.component.html',
  styleUrl: './tbl-escrow-companies-mat.component.scss'
})
export class TblEscrowCompaniesMatComponent implements OnInit, AfterViewChecked {
  @ViewChild('paginator') paginator!: MatPaginator;
  loadingItems: boolean = true;
  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  public loadSpinnerDiameter: string = '50';
  tableTitle: string = 'Escrow Companies';
  tableItemName: string = 'Escrow Company';
  dataSource!: MatTableDataSource<EscrowCompanyDto>;
  dataTypeTag: string = 'escrowCompanies';
  totalItemsCount: number = 0;
  columnsToDisplay: string[] = ['companyName', 'companyPhone'];
  columnsToDisplayWithActions: string[] = [...this.columnsToDisplay, 'actions'];
  columnNamesToDisplay: string[] = ['Company', 'Main Phone'];
  columnsConfig: Map<string, any> = new Map<string, any>([
    ['companyPhone', {type: 'phone', mask: '(000) 000-0000'}]
    ]);

  constructor(
    public modal: MatDialog,
    private logger: NGXLogger,
    private service: EscrowCompanyService
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
    this.dataSource = new MatTableDataSource<EscrowCompanyDto>(itemsDataObj.items);
    this.loadingItems = false;
  }

  async loadItemsData(): Promise<ListWithCountDto> {
    return  await this.service.loadAllItems();
  }

  openItemUpdateFormModal(item: EscrowCompanyDto, index: number) {
    this.modal.open(TblEscrowCompanyFormMatComponent, {
      data: {
        type: 'update',
        item,
        index
      }
    });
  }

  openItemCreateFormModal() {
    this.modal.open(TblEscrowCompanyFormMatComponent, {
      data: {
        type: 'new'
      }
    });
  }

  addItem() {
    this.openItemCreateFormModal();
  }

  editItem(event: any, item: EscrowCompanyDto) {
    const index: number = this.dataSource.data.findIndex((ecItem: EscrowCompanyDto) => item.companyName === ecItem.companyName);
    this.openItemUpdateFormModal(item, index);
  }

  onPageEvent(event: any) {
    console.log('onPageEvent - event: ', event);
    console.log('onPageEvent - dataSource - paginator: ', this.dataSource.paginator)
  }

}
