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
import { AdvanceEntity } from '../../entities/advance.entity';
import { ListWithCountDto } from '../../dtos/list-with-count.dto';
import { MatDialog } from '@angular/material/dialog';
import { HelpersService } from '../../service/helpers.service';
import { LedgerEntity } from '../../entities/ledger.entity';
import { User } from '../../entities/user.interface';
import { LedgerFormDialogComponent } from './ledger-form-dialog/ledger-form-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { OptionValuesDgComponent } from '../options-dg/option-values-dg/option-values-dg.component';
import { AuthenticationService } from '../../service';
import { LedgerItemsDgComponent } from './ledger-items-dg/ledger-items-dg.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LedgerDto } from '../../dtos/ledger.dto';

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
    'balance'

  ];
  columnsToDisplayWithActions: string[] = [...this.columnsToDisplay, 'ledgerActions'];
  columnNamesToDisplay: string[] = ['Client', 'Balance', 'Actions'];
  columnsConfig: Map<string, any> = new Map<string, any>([
    ['balance', {type: 'currency', mask: 'separator.2', thousandSeparator: ',', prefix: '$'}],
  ]);

  expandedLedger: LedgerEntity | null = null;
  expandedLedgerClientId: string | null = null;
  user: User

  constructor(
    public modal: MatDialog,
    public helpers: HelpersService,
    private authService: AuthenticationService
    ) {
    this.user = this.authService.getLocalUser();
  }

  async ngOnInit() {
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

  openItemCreateFormModal() {
    this.modal.open(LedgerFormDialogComponent, {
      data: {
        type: 'new',
        dataType: this.dataTypeTag,
      }
    });
  }

  addItem() {
    this.openItemCreateFormModal();
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
