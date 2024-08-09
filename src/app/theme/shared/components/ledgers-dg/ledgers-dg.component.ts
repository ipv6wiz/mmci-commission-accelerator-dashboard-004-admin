import { AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NestedColumnPipe } from '../../pipes/nested-column.pipe';
import { MatBoolDisplayPipe } from '../../pipes/mat-bool-display.pipe';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { DatePipe, NgStyle } from '@angular/common';
import { ListWithCountDto } from '../../dtos/list-with-count.dto';
import { MatDialog } from '@angular/material/dialog';
import { HelpersService } from '../../service/helpers.service';
import { LedgerEntity } from '../../entities/ledger.entity';
import { User } from '../../entities/user.interface';
import { LedgerFormDialogComponent } from './ledger-form-dialog/ledger-form-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { AuthenticationService } from '../../service';
import { LedgerItemsDgComponent } from './ledger-items-dg/ledger-items-dg.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LedgerDto } from '../../dtos/ledger.dto';
import { OptionValue } from '../../entities/option-values.interface';
import { OptionsService } from '../../service/options.service';
import { LedgerTransactionTypeDto } from '../../dtos/ledger-transaction-type.dto';
import { ApiResponse } from '../../dtos/api-response.dto';

@Component({
  selector: 'app-ledgers-dg',
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
    DatePipe,
    MatIcon,
    LedgerItemsDgComponent,
    NgStyle
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './ledgers-dg.component.html',
  styleUrl: './ledgers-dg.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class LedgersDgComponent implements OnInit, AfterViewChecked {
  @ViewChild('paginator') paginator!: MatPaginator;
  @Input() loadingItems: boolean = true;
  @Input() dgDataObj!: ListWithCountDto;

  tableTitle: string = 'Client Ledgers';
  tableItemName: string = 'Client Ledger';
  dataSource!: MatTableDataSource<LedgerDto>;
  dataTypeTag: string = 'ledgers';
  totalItemsCount: number = 0;

  columnsToDisplay: string[] = [
    'currClient.displayName',
    'balance',
    'creditLimit'
  ];
  columnsToDisplayWithActions: string[] = [...this.columnsToDisplay, 'ledgerCredit', 'ledgerActions'];
  columnNamesToDisplay: string[] = ['Client', 'Balance', 'Advance Limit', 'Available'];
  columnsConfig: Map<string, any> = new Map<string, any>([
    ['balance', {type: 'currency', mask: 'separator.2', thousandSeparator: ',', prefix: '$'}],
    ['creditLimit', {type: 'currency', mask: 'separator.2', thousandSeparator: ',', prefix: '$', allowZero: false}],
  ]);

  expandedLedger: LedgerEntity | null = null;
  expandedLedgerClientId: string | null = null;
  user: User;
  transactionTypes: LedgerTransactionTypeDto[] = [];

  constructor(
    public modal: MatDialog,
    public helpers: HelpersService,
    private authService: AuthenticationService,
    private optionsService: OptionsService
    ) {
    this.user = this.authService.getLocalUser();
  }

  async ngOnInit() {
    const response: ApiResponse = await this.optionsService.loadValuesByType('LedgerTransTypes');
    console.debug('LedgersDgComponent - ngOnInit - response: ', response);
    if(response.statusCode === 200) {
      this.transactionTypes = this.helpers.makeLedgerTransTypes(response.data.items);
    }
    await this.refreshItemsList();
  }

  async ngAfterViewChecked() {
    if(this.dataSource && ( !this.loadingItems && !this.dataSource.paginator)) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async refreshItemsList(){
    this.loadingItems = true;
    if(this.dgDataObj) {
      this.totalItemsCount = this.dgDataObj.count;
      this.dataSource = new MatTableDataSource<LedgerDto>(this.dgDataObj.items);
      this.loadingItems = false;
    }
  }

  openItemUpdateFormModal(item: LedgerEntity, index: number) {
    this.modal.open(LedgerFormDialogComponent, {
      data: {
        type: 'update',
        dataType: this.dataTypeTag,
        item,
        index
      }
    });
  }

  openItemCreateFormModal(item: LedgerEntity) {
    this.modal.open(LedgerFormDialogComponent, {
      data: {
        type: 'new',
        dataType: this.dataTypeTag,
        transTypes: this.transactionTypes,
        item,
      }
    });
  }

  addItem(item: LedgerEntity) {
    this.openItemCreateFormModal(item);
  }

  editItem(event: any, item: LedgerEntity) {
    const index: number = this.dataSource.data.findIndex((ldgItem: LedgerDto) => item.clientId === ldgItem.clientId);
    this.openItemUpdateFormModal(item, index);
  }

  onPageEvent(event: any) {
    console.log('onPageEvent - event: ', event);
    console.log('onPageEvent - dataSource - paginator: ', this.dataSource.paginator)
  }

  onExpandRow(event: any, ledger: LedgerEntity) {
    event.stopPropagation();
    console.log('onExpandRow - event: ', event);
    console.log('onExpandRow - option: ', ledger);
    console.log('onExpandRow - expandedClient (before): ', this.expandedLedgerClientId);
    if(this.expandedLedger === null) {
      this.expandedLedger = ledger;
    } else {
      this.expandedLedger = null;
    }
    console.log('onExpandRow - expandedClient (after): ', this.expandedLedger);
  }

}
