import { Component, effect, OnInit, ViewChild } from '@angular/core';
import {
  CardSettingsModel,
  ColumnsModel,
  KanbanComponent, KanbanModule,
  SwimlaneSettingsModel
} from '@syncfusion/ej2-angular-kanban';
import { environment } from '../../../../../environments/environment';
import { OptionsService } from '../../service/options.service';
import { AdvanceService } from '../../service/advance.service';
import { ListWithCountDto } from '../../dtos/list-with-count.dto';
import {  registerLicense } from '@syncfusion/ej2-base';
import { AppConfig } from '../../../../app.config';
import { MatDialog } from '@angular/material/dialog';
import { RequestPendingDialogComponent } from './request-pending-dialog/request-pending-dialog.component';
import { PendingEscrowDialogComponent } from './pending-escrow-dialog/pending-escrow-dialog.component';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { AuthenticationService } from '../../service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { EscrowCompanyDto } from '../../dtos/escrow-company.dto';
import { MlsListDto } from '../../dtos/mls-list.dto';
import { EscrowCompanyService } from '../../service/escrow-company.service';
import { MlsListService } from '../../service/mls-list.service';
import { advanceKanbanRefreshSignal } from '../../signals/advance-kanban-refresh.signal';
import { LedgerService } from '../../service/ledger.service';
import { PromoCodeService } from '../../service/promo-code.service';
import { PromoCodeDto } from '../../dtos/promo-code.dto';
import { OptionValue } from '../../entities/option-values.interface';
import { ApiResponse } from '../../dtos/api-response.dto';
import { PendingApprovalDialogComponent } from './pending-approval-dialog/pending-approval-dialog.component';
registerLicense('ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Ud0xhW31WdXRSRGlc');
@Component({
  selector: 'app-advances-kanban',
  standalone: true,
  imports: [
    KanbanModule,
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './advances-kanban.component.html',
  styleUrl: './advances-kanban.component.scss'
})
export class AdvancesKanbanComponent implements OnInit {
  escrow!: EscrowCompanyDto[];
  mls!: MlsListDto[];
  promoCodes!: PromoCodeDto[];
  promoCodeOptions!: OptionValue[];
  readonly version: string;
  private config = new AppConfig();
  private readonly apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'advance';
  private endPointUrl: string = `${this.apiUrl}/${this.endPoint}`;
  private validDataTypeTags: string[] = [
    'kb-request-pending-dialog',
    'kb-pending-escrow-dialog',
    'kb-pending-approval-dialog'
  ];
  // @ts-expect-error could be null
  @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
  enableToolTip: boolean = true;
  validColumns: Map<string, string[]> = new Map([
    ['REQUEST-PENDING', ['REJECTED']],
    ['PENDING-ESCROW', ['REJECTED']],
    ['PENDING-CLIENT', ['REJECTED']],
    ['PENDING-CONTRACTS', ['REJECTED']],
    ['PENDING-FUNDING', ['REJECTED']],
    ['PENDING-DEMAND', ['REJECTED']],
    ['ADVANCE-FUNDED', ['REJECTED']],
    ['ESCROW-CLOSED', ['CURRENT-BALANCE']],
    ['CURRENT-BALANCE', ['BALANCE-CLEARED']],
    ['BALANCE-CLEARED', []],
    ['REJECTED', []]
  ]);

  kanbanData!: DataManager;
  columns: ColumnsModel[] = [];
  cardSettings: CardSettingsModel = {
    headerField: 'advanceName',
    selectionType: 'Single',

  }
  swimLaneSettings: SwimlaneSettingsModel = {
    keyField: 'clientId',
    textField: 'displayName'
  }




  constructor(
    public modal: MatDialog,
    private optionService: OptionsService,
    private promoCodeService: PromoCodeService,
    private advanceService: AdvanceService,
    private ledgerService: LedgerService,
    private authService: AuthenticationService,
    private escrowService: EscrowCompanyService,
    private mlsService: MlsListService,
  ) {
    console.log('AdvancesKanbanComponent - constructor');
    effect(() => {
      const akrs = advanceKanbanRefreshSignal();
      if(akrs.refresh && this.validDataTypeTags.includes(akrs.dataType)) {
        this.refreshKanban({})
      }
    });
    this.version = this.config.version;
    const token: string = this.authService.getLocalUserDataProp('accessToken');
    this.kanbanData = new DataManager({
      adaptor: new UrlAdaptor(),
      url: `${this.endPointUrl}/kanban`,
      headers: [{'Authorization': `Bearer ${token}`}],
      crossDomain: true,

    });

    this.getAdvanceStatusFromOptions().then((cols) => {
      this.columns = cols;
      console.log('AdvancesKanbanComponent - constructor - columns: ', this.columns);
      for(let i = 0; i < this.columns.length; i++) {
        this.columns[i].transitionColumns = this.setValidDropColumn(this.columns[i].keyField+'');
      }
      console.log('AdvancesKanbanComponent - constructor - columns with transitions: ', this.columns);
    });
  }

  async ngOnInit() {
    this.escrow = await this.loadEscrowCompanies();
    this.mls = await this.loadMlsList();
    this.promoCodes = await this.loadPromoCodes();
    this.promoCodeOptions = await this.loadPromoCodesOptionValues();
  }

  refreshKanban(event: any) {
    console.log('refreshKanban - event: ', event);
    this.kanbanObj.refresh();
  }

  cardDoubleClick(event: any) {
    console.log('cardDoubleClick - event: ', event);
    event.cancel = true;
    const data: any = event.data;
    switch(data.advanceStatus) {
      case 'REQUEST-PENDING':
        this.openRequestPendingFormModal(data);
        break;
      case 'PENDING-ESCROW':
        this.openPendingEscrowFormModal(data).then();
        break;
      case 'PENDING-APPROVAL':
        this.openPendingApprovalFormModal(data);
        break;
    }
  }

  openRequestPendingFormModal(requestData: any) {
    this.modal.open(RequestPendingDialogComponent, {
      data: {
        type: 'update',
        dataType: 'kb-request-pending-dialog',
        item: requestData,
        escrow: this.escrow,
        mls: this.mls
      },
      disableClose: true,
      hasBackdrop: true
    });
  }

  async openPendingEscrowFormModal(requestData: any) {
    const creditObj = await this.ledgerService.getClientBalance(requestData.currClient.uid);
    this.modal.open(PendingEscrowDialogComponent, {
      data: {
        type: 'update',
        dataType: 'kb-pending-escrow-dialog',
        item: requestData,
        creditObj,
        promoCodes: this.promoCodes,
        promoOptions: this.promoCodeOptions
      },
      disableClose: true,
      hasBackdrop: true
    });
  }

  openPendingApprovalFormModal(requestData: any) {
    this.modal.open(PendingApprovalDialogComponent, {
      data: {
        type: 'update',
        dataType: 'kb-pending-approval-dialog',
        item: requestData
      },
      disableClose: true,
      hasBackdrop: true
    });
  }

  public getString(displayName: string) {
    // @ts-expect-error could be null
    return displayName.match(/\b(\w)/g).join('').toUpperCase();
  }

  async getAdvanceStatusFromOptions() {
    const statusListResponse: ListWithCountDto = await this.optionService.loadValuesItemsForSelect('AdvanceStatus');
    const columnsList: ColumnsModel[] = [];
    statusListResponse.items.forEach((item: any) => {
      const colItem: ColumnsModel = {
        headerText: item.value,
        keyField: item.key,
        allowToggle: true
      }
      columnsList.push(colItem);
    });
    return columnsList;
  }

  setValidDropColumn(advanceStatus: string) {
    return this.validColumns.get(advanceStatus) || [];
  }

  async loadEscrowCompanies(): Promise<EscrowCompanyDto[]> {
    const response = await this.escrowService.loadItemsForSelect();
    return response.items;
  }

  async loadMlsList(): Promise<MlsListDto[]> {
    const response = await this.mlsService.loadItemsForSelect();
    return response.items;
  }

  async loadPromoCodes(): Promise<PromoCodeDto[]> {
    const response: PromoCodeDto[] = await this.promoCodeService.loadAllPromoCodes();
    console.log('loadPromoCodes - items: ',response);
    return response;
  }

  async loadPromoCodesOptionValues(): Promise<OptionValue[]> {
    const response: ApiResponse = await this.optionService.loadValuesByType('PromoCodes');
    console.log('loadPromoCodes - items: ',response.data.items);
    return response.data.items;
  }

}
