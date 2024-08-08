import { Component, effect, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatToolbar } from '@angular/material/toolbar';
import { OptionsDgComponent } from '../../../theme/shared/components/options-dg/options-dg.component';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { OptionsEntity } from '../../../theme/shared/entities/options.interface';
import { LedgerEntity } from '../../../theme/shared/entities/ledger.entity';
import { LedgerService } from '../../../theme/shared/service/ledger.service';
import { HelpersService } from '../../../theme/shared/service/helpers.service';
import { MatDialog } from '@angular/material/dialog';
import { dataGridRefreshSignal } from '../../../theme/shared/signals/data-grid-refresh.signal';
import { ListWithCountDto } from '../../../theme/shared/dtos/list-with-count.dto';
import { LedgersDgComponent } from '../../../theme/shared/components/ledgers-dg/ledgers-dg.component';

@Component({
  selector: 'app-tbl-ledgers-mat',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatProgressSpinner,
    MatToolbar,
    OptionsDgComponent,
    LedgersDgComponent
  ],
  templateUrl: './tbl-ledgers-mat.component.html',
  styleUrl: './tbl-ledgers-mat.component.scss'
})
export class TblLedgersMatComponent implements OnInit {
  loadingItems: boolean = true;
  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  public loadSpinnerDiameter: string = '50';
  tableTitle: string = 'Client Ledgers';
  tableItemName: string = 'Ledger';
  dataSource!: MatTableDataSource<LedgerEntity>;
  dataTypeTag: string = 'ledgers';
  ledgerItemsObj: any;

  constructor(
    public modal: MatDialog,
    private service: LedgerService,
    public helpers: HelpersService
  ) {
    effect(() => {
      console.log('dataGridRefreshSignal - effect entered');
      const dgrs = dataGridRefreshSignal();
      if(dgrs.refresh && dgrs.dataType === this.dataTypeTag) {
        this.refreshItemsList().then(() => true);
      }
    });
  }

  async ngOnInit() {
    await this.refreshItemsList();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refreshItemsList(sortBy: string = 'optionName', filter: string = '') {
    console.log('>>>>>>>> refreshItemsList <<<<<<<<');
    this.loadingItems = true;
    this.ledgerItemsObj = await this.loadItemsData(sortBy);
    this.loadingItems = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async loadItemsData(sortBy: string): Promise<ListWithCountDto>{
    return await this.service.loadAllLedgerItems();
  }
}
