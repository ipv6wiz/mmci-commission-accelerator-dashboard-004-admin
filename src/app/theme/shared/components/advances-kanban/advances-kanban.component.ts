import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  CardSettingsModel,
  ColumnsModel,
  KanbanComponent, KanbanModule,
  SwimlaneSettingsModel
} from '@syncfusion/ej2-angular-kanban';
import { environment } from '../../../../../environments/environment';
import { OptionsService } from '../../service/options.service';
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
import { PendingContractsDialogComponent } from './pending-contracts-dialog/pending-contracts-dialog.component';
import { PendingFundingDialogComponent } from './pending-funding-dialog/pending-funding-dialog.component';
import { AdvanceHelpersService } from '../../service/advance-helpers.service';
import { AdvanceFundedDialogComponent } from './advance-funded-dialog/advance-funded-dialog.component';
import { EscrowClosedDialogComponent } from './escrow-closed-dialog/escrow-closed-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { AdvanceStatusConfigDto } from '../../dtos/advance-status-config.dto';
import { AdvanceWorkflowDialogConfigEntity } from '../../entities/advance-workflow-dialog-config.entity';
registerLicense('ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Ud0xhW31WdXRSRGlc');

@Component({
  selector: 'app-advances-kanban',
  standalone: true,
  imports: [
    KanbanModule,
    AsyncPipe,
    CurrencyPipe,
    MatIconModule
  ],
  templateUrl: './advances-kanban.component.html',
  styleUrl: './advances-kanban.component.scss'
})
export class AdvancesKanbanComponent implements OnInit  {
  @ViewChild('kanbanObj') kanbanObj!: KanbanComponent;
  escrow!: EscrowCompanyDto[];
  mls!: MlsListDto[];
  promoCodes!: PromoCodeDto[];
  advanceOptionsItems!: Map<string, AdvanceWorkflowDialogConfigEntity>;

  readonly version: string;
  private config: AppConfig = new AppConfig();
  private readonly apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'advance';
  private endPointUrl: string = `${this.apiUrl}/${this.endPoint}`;
  private validDataTypeTags: string[] = [
    'kb-request-pending-dialog',
    'kb-pending-escrow-dialog',
    'kb-pending-approval-dialog',
    'kb-pending-contracts-dialog',
    'kb-pending-funding-dialog',
    'kb-advance-funded-dialog',
    'kb-ucc-filed-dialog',
    'kb-escrow-closed-dialog',
    'kb-outstanding-balance-dialog',
    'kb-rejected-dialog'
  ];


  enableToolTip: boolean = true;
  validColumns: Map<string, string[]> = new Map([
    ['REQUEST-PENDING', ['REJECTED']],
    ['PENDING-ESCROW', ['REJECTED']],
    ['PENDING-APPROVAL', ['REJECTED']],
    ['PENDING-CONTRACTS', ['REJECTED']],
    ['PENDING-FUNDING', ['REJECTED']],
    ['ADVANCE-FUNDED', ['UCC-FILED']],
    ['UCC-FILED', ['ESCROW-CLOSED']],
    ['ESCROW-CLOSED', ['ESCROW-CLOSED']],
    ['OUTSTANDING-BALANCE', ['OUTSTANDING-BALANCE']],
    ['CLEARED', ['CLEARED']],
    ['REJECTED', ['REJECTED']]
  ]);

  kanbanData!: DataManager;
  columns: ColumnsModel[] = [];
  colMatIcons: string[] = [];
  cardSettings: CardSettingsModel = {
    headerField: 'advanceName',
    selectionType: 'Single',

  }
  swimLaneSettings: SwimlaneSettingsModel = {
    keyField: 'clientId',
    textField: 'displayName',
  }

  constructor(
    public modal: MatDialog,
    private optionService: OptionsService,
    private promoCodeService: PromoCodeService,
    private advanceHelpers: AdvanceHelpersService,
    private ledgerService: LedgerService,
    private authService: AuthenticationService,
    private escrowService: EscrowCompanyService,
    private mlsService: MlsListService,
    private renderer: Renderer2
  ) {
    console.log('AdvancesKanbanComponent - constructor');
    this.version = this.config.version;
    effect(() => {
      const akrs = advanceKanbanRefreshSignal();
      if(akrs.refresh && this.validDataTypeTags.includes(akrs.dataType)) {
        this.refreshKanban({})
      }
    });

    const token: string = this.authService.getLocalUserDataProp('accessToken');
    this.kanbanData = new DataManager({
      adaptor: new UrlAdaptor(),
      url: `${this.endPointUrl}/kanban`,
      headers: [{'Authorization': `Bearer ${token}`}],
      crossDomain: true,
    });
    this.advanceHelpers.getAdvanceStatusFromOptions().then((response: AdvanceStatusConfigDto) => {
      this.columns = response.columnsList;
      this.colMatIcons = response.colMatIcons;
      this.advanceOptionsItems = response.advanceOptionsItems;
      console.log('AdvancesKanbanComponent - constructor - columns: ', this.columns);
      console.log('AdvancesKanbanComponent - constructor - colMatIcons: ', this.colMatIcons);
      console.log('AdvancesKanbanComponent - constructor - advanceOptionsItems: ', this.advanceOptionsItems);
      for(let i = 0; i < this.columns.length; i++) {
        this.columns[i].transitionColumns = this.setValidDropColumn(this.columns[i].keyField+'');
      }
      console.log('AdvancesKanbanComponent - constructor - columns with transitions: ', this.columns);
    });
  }

  async ngOnInit() {
    console.debug('Kanban OnInit');
    this.escrow = await this.loadEscrowCompanies();
    this.mls = await this.loadMlsList();
    this.promoCodes = await this.loadPromoCodes();

    let swimlaneRows: HTMLCollectionOf<Element> = document.getElementsByClassName('e-content-cells e-template');
    const count: number = swimlaneRows.length;
    for(let i = 0; i < count; i++) {
      // @ts-ignore
      swimlaneRows.item(i)!.click();
    }
  }

  async onDrop(event: any) {
    console.log('=========> onDrop - event: ', event);
    if(event.dropIndex !== undefined){
      const status: string = event.data[0].advanceStatus;
      const advanceId: string = event.data[0].uid;
      await this.advanceHelpers.updateAdvanceStatus(advanceId, status);
    }
  }

  refreshKanban(event: any) {
    console.log('refreshKanban - event: ', event);
    this.kanbanObj.refresh();
  }

  cardDoubleClick(event: any) {
    console.debug('cardDoubleClick - event: ', event);
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
      case 'PENDING-CONTRACTS':
        this.openPendingContractsFormModal(data);
        break;
      case 'PENDING-FUNDING':
        this.openPendingFundingFormModal(data);
        break;
      case 'ADVANCE-FUNDED':
        this.openAdvanceFundedFormModal(data);
        break;
      case 'ESCROW-CLOSED':
        this.openEscrowClosedFormModal(data);
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
        mls: this.mls,
        wfConfig: this.advanceOptionsItems.get('REQUEST-PENDING')
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
        wfConfig: this.advanceOptionsItems.get('PENDING-ESCROW')
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
        item: requestData,
        wfConfig: this.advanceOptionsItems.get('PENDING-APPROVAL')
      },
      disableClose: true,
      hasBackdrop: true
    });
  }

  openPendingContractsFormModal(requestData: any) {
    this.modal.open(PendingContractsDialogComponent, {
      data: {
        type: 'update',
        dataType: 'kb-pending-contracts-dialog',
        item: requestData,
        wfConfig: this.advanceOptionsItems.get('PENDING-CONTRACTS')
      },
      disableClose: true,
      hasBackdrop: true
    });
  }

  openPendingFundingFormModal(requestData: any) {
    this.modal.open(PendingFundingDialogComponent, {
      data: {
        type: 'update',
        dataType: 'kb-pending-funding-dialog',
        item: requestData,
        wfConfig: this.advanceOptionsItems.get('PENDING-FUNDING')
      },
      disableClose: true,
      hasBackdrop: true
    });

  }

  openAdvanceFundedFormModal(requestData: any) {
    this.modal.open(AdvanceFundedDialogComponent, {
      data: {
        type: 'update',
        dataType: 'kb-advance-funded-dialog',
        item: requestData,
        wfConfig: this.advanceOptionsItems.get('ADVANCE-FUNDED')
      }
    });
  }

  openEscrowClosedFormModal(requestData: any) {
    this.modal.open(EscrowClosedDialogComponent, {
      data: {
        type: 'update',
        dataType: 'kb-escrow-closed-dialog',
        item: requestData,
        wfConfig: this.advanceOptionsItems.get('ESCROW-CLOSED')
      }
    });
  }

  public getString(displayName: string) {
    // @ts-expect-error could be null
    return displayName.match(/\b(\w)/g).join('').toUpperCase();
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
