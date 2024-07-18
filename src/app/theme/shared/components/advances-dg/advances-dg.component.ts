import { AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {
 MatTableDataSource, MatTableModule
} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NestedColumnPipe } from '../../pipes/nested-column.pipe';
import { AdvanceEntity } from '../../entities/advance.entity';
import { MatDialog } from '@angular/material/dialog';
import { ListWithCountDto } from '../../dtos/list-with-count.dto';
import { AdvanceRequestFormDialogComponent } from './advance-request-form-dialog/advance-request-form-dialog.component';
import { AuthenticationService } from '../../service';
import { HelpersService } from '../../service/helpers.service';
import { MatBoolDisplayPipe } from '../../pipes/mat-bool-display.pipe';
import { EscrowCompanyDto } from '../../dtos/escrow-company.dto';
import { MlsListDto } from '../../dtos/mls-list.dto';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-advances-dg',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatTableModule,
    MatPaginatorModule,
    NgxMaskPipe,
    NestedColumnPipe,
    MatBoolDisplayPipe,
    MatTooltip,
    MatIconButton,
    DatePipe
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './advances-dg.component.html',
  styleUrl: './advances-dg.component.scss'
})
export class AdvancesDgComponent implements OnInit, AfterViewChecked{
  @ViewChild('paginator') paginator!: MatPaginator;
  @Input() loadingItems: boolean = true;
  @Input() dgDataObj!: ListWithCountDto;
  @Input() advanceStatus!: string; // pending, current, paid, cleared, rejected
  @Input() escrow!: EscrowCompanyDto[];
  @Input() mls!: MlsListDto[];
  /*
    pending: Request has been made but not yet approved
    current: Request approved
    paid: Request approved and paid to Client
    cleared: Escrow closed remainder of commission less the fee has been paid
    rejected: Request rejected and reason provided
   */


  tableTitle: string = 'Commission Advances';
  tableItemName: string = 'Commission Advance';
  dataSource!: MatTableDataSource<AdvanceEntity>;
  dataTypeTag: string = 'advances';

  totalItemsCount: number = 0;
  columnsToDisplay: string[] = [
    'currClient.displayName',
    'advanceStatus',
    'propertyAddress.Address1',
    'mlsId',
    'mlsSystem',
    'amountRequested',
    'dateRequested',
    'amountApproved',
    'estimatedClosingDate',
    'actualClosingDate'
  ];
  columnsToDisplayWithActions: string[] = [...this.columnsToDisplay];
  columnNamesToDisplay: string[] = ['Client', 'Status','Property', 'MLS #', 'MLS System', 'Requested', 'Date Requested', 'Approved', 'Est. Closing', 'Act. Closing'];
  columnsConfig: Map<string, any> = new Map<string, any>([
    ['amountRequested', {type: 'currency', mask: 'separator', thousandSeparator: ',', prefix: '$'}],
    ['amountApproved', {type: 'currency', mask: 'separator', thousandSeparator: ',', prefix: '$'}],
    ['estimatedClosingDate', {type: 'date', format: 'shortDate'}],
    ['actualClosingDate', {type: 'date', format: 'shortDate'}],
  ]);



  constructor(
    public modal: MatDialog,
    public helpers: HelpersService,
    private authService: AuthenticationService,
  ) {}

  async ngOnInit() {
    // console.log('ngOnInit - client: ', this.clientService.getOne(this.getClientId()));
    await this.refreshItemsList();
  }

  async ngAfterViewChecked() {
    // console.log('AdvancesDgComponent - ngAfterViewChecked - entered');
    if(this.dataSource && ( !this.loadingItems && !this.dataSource.paginator)) {
      // console.log('AdvancesDgComponent - ngAfterViewChecked - loading paginator & data');
      this.dataSource.paginator = this.paginator;
    }
  }

  async refreshItemsList(sortBy: string = 'dateRequested', filter: string = '') {
    // console.log('AdvancesDgComponent - refreshItemsList - entered');
    this.loadingItems = true;
    // while(this.loadingItems) {
      if(this.dgDataObj) {
        this.totalItemsCount = this.dgDataObj.count;
        this.dataSource = new MatTableDataSource<AdvanceEntity>(this.dgDataObj.items);
        // console.log('AdvancesDgComponent - refreshItemsList - items: ', this.advanceObj.items);
        // console.log('AdvancesDgComponent - refreshItemsList - count: ', this.advanceObj.count);
        this.loadingItems = false;
      }
    // }
    // console.log('AdvancesDgComponent - refreshItemsList - EXIT');
  }

  openItemUpdateFormModal(item: AdvanceEntity, index: number) {
    this.modal.open(AdvanceRequestFormDialogComponent, {
      data: {
        type: 'update',
        dataType: this.dataTypeTag,
        escrow: this.escrow,
        mls: this.mls,
        item,
        index
      }
    });
  }

  openItemCreateFormModal() {
    this.modal.open(AdvanceRequestFormDialogComponent, {
      data: {
        type: 'new',
        dataType: this.dataTypeTag,
        escrow: this.escrow,
        mls: this.mls,
      }
    });
  }

  addItem() {
    this.openItemCreateFormModal();
  }

  editItem(event: any, item: AdvanceEntity) {
    const index: number = this.dataSource.data.findIndex((advItem: AdvanceEntity) => item.uid === advItem.uid);
    this.openItemUpdateFormModal(item, index);
  }

  onPageEvent(event: any) {
    console.log('onPageEvent - event: ', event);
    console.log('onPageEvent - dataSource - paginator: ', this.dataSource.paginator)
  }

}
