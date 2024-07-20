import { Component, effect, OnInit } from '@angular/core';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { NgbNav, NgbNavContent, NgbNavItem, NgbNavLink } from '@ng-bootstrap/ng-bootstrap';
import { AdvancesDgComponent } from '../../../theme/shared/components/advances-dg/advances-dg.component';
import { EscrowCompanyDto } from '../../../theme/shared/dtos/escrow-company.dto';
import { MlsListDto } from '../../../theme/shared/dtos/mls-list.dto';
import { ListWithCountDto } from '../../../theme/shared/dtos/list-with-count.dto';
import { EscrowCompanyService } from '../../../theme/shared/service/escrow-company.service';
import { MlsListService } from '../../../theme/shared/service/mls-list.service';
import { ClientService } from '../../../theme/shared/service/client.service';
import { AdvanceService } from '../../../theme/shared/service/advance.service';
import { HelpersService } from '../../../theme/shared/service/helpers.service';
import { AuthenticationService } from '../../../theme/shared/service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {
  AdvanceRequestFormDialogComponent
} from '../../../theme/shared/components/advances-dg/advance-request-form-dialog/advance-request-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {  MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { dataGridRefreshSignal } from '../../../theme/shared/signals/data-grid-refresh.signal';
import { dashCardsRefreshSignal } from '../../../theme/shared/signals/dash-cards-refresh.signal';
import { AdvancesKanbanComponent } from '../../../theme/shared/components/advances-kanban/advances-kanban.component';

@Component({
  selector: 'app-tbl-comm-advances',
  standalone: true,
  imports: [
    CardComponent,
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NgbNavContent,
    AdvancesDgComponent,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatToolbar,
    MatProgressSpinner,
    AdvancesKanbanComponent
  ],
  templateUrl: './tbl-comm-advances.component.html',
  styleUrl: './tbl-comm-advances.component.scss'
})
export class TblCommAdvancesComponent implements OnInit {
  escrow!: EscrowCompanyDto[];
  mls!: MlsListDto[];
  advanceItemsObj!: ListWithCountDto;
  loadingAdvanceItems: boolean = true;

  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  public loadSpinnerDiameter: string = '50';
  tableTitle: string = 'Commission Advances';
  tableItemName: string = 'Commission Advance';
  dataTypeTag: string = 'advances';

  advancesByCategory: Map<string, ListWithCountDto> = new Map<string, ListWithCountDto>();

  advanceStatus: string[] = [
    'pending',
    'current',
    'paid',
    'cleared',
    'rejected'
  ];

  constructor(
    public modal: MatDialog,
    private authService: AuthenticationService,
    private escrowService: EscrowCompanyService,
    private mlsService: MlsListService,
    private clientService: ClientService,
    private service: AdvanceService,
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
    this.escrow = await this.loadEscrowCompanies();
    this.mls = await this.loadMlsList();
    await this.refreshItemsList().then(() => {
      console.log('TblCommAdvancesComponent - ngOnInit - refreshItemsList - done')
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

  async refreshItemsList( filter: string = '', sortBy: string = 'dateRequested', sortDir: string = 'desc') {
    console.log('>>>>>>>> refreshItemsList <<<<<<<<');
    this.loadingAdvanceItems = true;
    this.advanceItemsObj = await this.loadItemsForAdminDG(filter, sortBy, sortDir);
    this.advanceStatus.forEach((status: string) => {
      this.advancesByCategory.set(status, this.extractByAdvanceStatus(status))
    });
    this.loadingAdvanceItems = false;
    dashCardsRefreshSignal.set({refresh: true, dataType: 'advanceCards'});
  }

  async loadItemsForAdminDG(filter: string = '', sortBy: string = 'dateRequested', sortDir: string = 'desc'): Promise<ListWithCountDto> {
    return  await this.service.loadAllItemsForAdminDG(filter,  sortBy, sortDir);
  }


  extractByAdvanceStatus(status: string): ListWithCountDto {
    console.log('extractByAdvanceStatus - entered - status: ', status);
    let filteredItems: any[] = [];
    if(this.advanceItemsObj) {
      const items: any[] = this.advanceItemsObj.items;
      filteredItems = items.filter(item => {
        return item.advanceStatus === status;
      });
    }
    console.log('extractByAdvanceStatus - filteredItems: ', filteredItems);
    return {items: filteredItems, count: filteredItems.length};
  }

  getClientId(): string {
    // const clientData: any = this.authService.getLocalClientData();
    // return clientData.uid;
    return '';
  }

  async loadEscrowCompanies(): Promise<EscrowCompanyDto[]> {
    const response = await this.escrowService.loadItemsForSelect();
    return response.items;
  }

  async loadMlsList(): Promise<MlsListDto[]> {
    const response = await this.mlsService.loadItemsForSelect();
    return response.items;
  }

}
