import { AfterViewChecked, Component, effect, Input, OnInit, ViewChild } from '@angular/core';
import { LedgerItemEntity } from '../../../entities/ledger-item.entity';
import { LedgerEntity } from '../../../entities/ledger.entity';
import { User } from '../../../entities/user.interface';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { DatePipe, NgStyle } from '@angular/common';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatPaginator } from '@angular/material/paginator';
import { HelpersService } from '../../../service/helpers.service';
import { MatDialog } from '@angular/material/dialog';
import { dataGridRefreshSignal } from '../../../signals/data-grid-refresh.signal';
import { ApiResponse } from '../../../dtos/api-response.dto';
import { LedgerService } from '../../../service/ledger.service';
import { LedgerItemDto } from '../../../dtos/ledger-item.dto';
import { NestedColumnPipe } from '../../../pipes/nested-column.pipe';
import { IsNegativePipe } from '../../../pipes/isNegative.pipe';
import { MatBoolDisplayPipe } from '../../../pipes/mat-bool-display.pipe';
import { AdvanceService } from '../../../service/advance.service';
import { LedgerDto } from '../../../dtos/ledger.dto';

@Component({
  selector: 'app-ledger-items-dg',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTableModule,
    MatToolbar,
    MatTooltip,
    MatHeaderCellDef,
    DatePipe,
    NgxMaskPipe,
    NgStyle,
    NestedColumnPipe,
    IsNegativePipe,
    MatBoolDisplayPipe,
    MatPaginator
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './ledger-items-dg.component.html',
  styleUrl: './ledger-items-dg.component.scss'
})
export class LedgerItemsDgComponent implements OnInit, AfterViewChecked {
  @ViewChild('paginator') paginator!: MatPaginator;
  @Input() loadingItems: boolean = true;
  @Input() dgDataObj!: LedgerDto;
  @Input() user!: User;

  private componentName: string = 'LedgerItemsDgComponent';

  columnsToDisplay: string[] = [
    'transactionDate',
    'advanceName',
    'description',
    'transType',
    'amount',
    'balance'
  ];
  columnNamesToDisplay: string[] = [
    'Date',
    'Advance',
    'Description',
    'Type',
    'Amount',
    'Balance'
  ];
  columnsToDisplayWithActions: string[] = [...this.columnsToDisplay];
  columnsConfig: Map<string, any> = new Map<string, any>([
    ['amount', {type: 'currency', mask: 'separator.2', thousandSeparator: ',', prefix: '$'}],
    ['balance', {type: 'currency', mask: 'separator.2', thousandSeparator: ',', prefix: '$'}],
    ['transDate', {type: 'date', format: 'shortDate'}],
  ]);

  tableItemName: string = 'Ledger Transactions';
  dataTypeTag: string = 'ledgerItem';
  totalItemsCount: number = 0;
  advanceNames: Map<string, string> = new Map();

  ledgerItems!: LedgerItemDto[];
  dataSource!: MatTableDataSource<LedgerItemDto>;

  constructor(
    public modal: MatDialog,
    public helpers: HelpersService,
    private service: LedgerService,
    private advanceService: AdvanceService
  ) {

    effect(() => {
      const dgrs = dataGridRefreshSignal();
      console.log('OptionValuesDgComponent - dataGridRefreshSignal - effect entered - dgrs: ', dgrs);
      if(dgrs.refresh && dgrs.dataType === this.dataTypeTag && dgrs.dataId === this.dgDataObj.clientId) {
        this.refreshItemsList().then(() => true);
      }
    });
  }

  async ngOnInit() {
    this.advanceNames = await this.advanceService.loadAdvanceNames(this.dgDataObj.clientId);
    await this.refreshItemsList()
  }

  ngAfterViewChecked() {
    if(this.dataSource && ( !this.loadingItems && !this.dataSource.paginator)) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async refreshItemsListX(clientId: string) {
    this.loadingItems = true;
    try {
      const response: ApiResponse = await this.service.getClientLedger(clientId);
      if(response.statusCode === 200) {
        this.ledgerItems = this.calcBalanceAndJoinAdvance(response.data.ledgerItems);
        this.loadingItems = false;
      } else {
        this.loadingItems = false;
        throw new Error(response.msg);
      }
    } catch (err: any) {
      this.loadingItems = false;
      throw new Error(err.message);
    }
  }

  async refreshItemsList() {
    this.loadingItems = true;
    if(this.dgDataObj) {
      const ledgerItemsObj: LedgerDto = this.dgDataObj;
      console.log(`${this.componentName} - refreshItemsList - ledgerItemsObj: `, ledgerItemsObj);
      if(ledgerItemsObj) {
        this.totalItemsCount = ledgerItemsObj.ledgerItems.length;
        const items = this.calcBalanceAndJoinAdvance(ledgerItemsObj.ledgerItems)
        this.dataSource = new MatTableDataSource<LedgerItemDto>(items);
        this.loadingItems = false;
      }
    }
  }

  calcBalanceAndJoinAdvance(items: LedgerItemDto[]): LedgerItemDto[] {
    let balance: number = 0;
    for(let i = items.length - 1; i >= 0; i--) {
      balance += items[i].amount;
      items[i].balance = balance;
      items[i].advanceName = items[i].advanceName || 'N/A';
    }
    return items;
  }

}
