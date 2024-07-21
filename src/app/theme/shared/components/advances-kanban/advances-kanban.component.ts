import { Component, ViewChild } from '@angular/core';
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
import { DataManager } from '@syncfusion/ej2-data';
import { KanbanAdaptorClass } from '../../classes/kanban-adaptor.class';
import { AuthenticationService } from '../../service';
registerLicense('ORg4AjUWIQA/Gnt2U1hhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Ud0xhW31WdXRSRGlc');
@Component({
  selector: 'app-advances-kanban',
  standalone: true,
  imports: [
    KanbanModule
  ],
  templateUrl: './advances-kanban.component.html',
  styleUrl: './advances-kanban.component.scss'
})
export class AdvancesKanbanComponent {
  readonly version: string;
  private config = new AppConfig();
  private readonly apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'advance';
  private readonly endPointUrl: string;
  // @ts-expect-error could be null
  @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
  enableToolTip: boolean = true;
  validColumns: Map<string, string[]> = new Map([
    ['REQUEST-PENDING', ['PENDING-ESCROW', 'REJECTED']],
    ['PENDING-ESCROW', ['PENDING-CLIENT', 'REJECTED']],
    ['PENDING-CLIENT', ['PENDING-CONTRACTS', 'REJECTED']],
    ['PENDING-CONTRACTS', ['PENDING-FUNDING', 'REJECTED']],
    ['PENDING-FUNDING', ['PENDING-DEMAND', 'REJECTED']],
    ['PENDING-DEMAND', ['ADVANCE-FUNDED', 'REJECTED']],
    ['ADVANCE-FUNDED', ['ESCROW-CLOSED', 'REJECTED']],
    ['ESCROW-CLOSED', ['CURRENT-BALANCE']],
    ['CURRENT-BALANCE', ['BALANCE-CLEARED']],
    ['BALANCE-CLEARED', []],
    ['REJECTED', []]
  ]);
  commAccData: any[] = [
    {
      clientId: 'Uz7UZXlrJvgqoDPpuBrGCwduHx82',
      displayName: 'John Page',
      advanceName: '704 N Main St',
      advanceStatus: 'REQUEST-PENDING',
      advanceRequested: '$10,000',
      notes: ''
    },
    {
      clientId: 'rppGoqXml7NoKIHyCJI0tD2ysst1',
      displayName: 'Thomas Thournir',
      advanceName: '710 N Main St',
      advanceStatus: 'PENDING-CLIENT',
      advanceRequested: '$15,000',
      notes:''
    },
    {
      clientId: 'Uz7UZXlrJvgqoDPpuBrGCwduHx82',
      displayName: 'John Page',
      advanceName: '123 Broadway',
      advanceStatus: 'PENDING-FUNDING',
      advanceRequested: '$12,000',
      notes: ''
    },
  ];

  // kanbanData: any[] = extend([], this.commAccData, null, true) as any[];
  private kanbanUrlAdaptor = new KanbanAdaptorClass();
  kanbanData: DataManager;
  columns: ColumnsModel[] = [];
  cardSettings: CardSettingsModel = {
    headerField: 'advanceName',
    selectionType: 'Single'
  }
  swimLaneSettings: SwimlaneSettingsModel = {
    keyField: 'clientId',
    textField: 'displayName'
  }

  constructor(
    public modal: MatDialog,
    private optionService: OptionsService,
    private advanceService: AdvanceService,
    private authService: AuthenticationService
  ) {
    const token: string = this.authService.getLocalUserDataProp('accessToken');
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
    this.version = this.config.version;
    this.kanbanData = new DataManager({
      adaptor: this.kanbanUrlAdaptor,
      url: `${this.endPointUrl}/kanban`,
      headers: [{'Authorization': `Bearer ${token}`}],
      crossDomain: true
    });
    console.log('kanbanData: ', this.kanbanData);
    this.getAdvanceStatusFromOptions().then((cols) => {
      this.columns = cols;
      console.log('AdvancesKanbanComponent - constructor - columns: ', this.columns);
      for(let i = 0; i < this.columns.length; i++) {
        this.columns[i].transitionColumns = this.setValidDropColumn(this.columns[i].keyField+'');
      }
      console.log('AdvancesKanbanComponent - constructor - columns with transitions: ', this.columns);
    });
  }

  cardDoubleClick(event: any) {
    console.log('cardDoubleClick - event: ', event);
    event.cancel = true;
    const data: any = event.data;
    switch(data.advanceStatus) {
      case 'REQUEST-PENDING':
        this.openRequestPendingFormModal();
        break;
      case 'PENDING-ESCROW':
        this.openPendingEscrowFormModal();
        break;
    }
  }

  openRequestPendingFormModal() {
    this.modal.open(RequestPendingDialogComponent, {
      data: {
        type: 'update',
        dataType: 'kb-request-pending-dialog'
      }
    });
  }

  openPendingEscrowFormModal() {
    this.modal.open(PendingEscrowDialogComponent, {
      data: {
        type: 'update',
        dataType: 'kb-pending-escrow-dialog'
      }
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
    // console.log('setValidDropColumn - advanceStatus: ', advanceStatus);
    // const validCols: string[] = this.validColumns.get(advanceStatus) || [];
    // console.log('setValidDropColumn - validCols: ', validCols);
    return this.validColumns.get(advanceStatus) || [];
  }

}
