import { Component, ViewChild } from '@angular/core';
import {
  CardSettingsModel,
  ColumnsModel,
  KanbanAllModule,
  KanbanComponent,
  SwimlaneSettingsModel
} from '@syncfusion/ej2-angular-kanban';
import { OptionsService } from '../../service/options.service';
import { AdvanceService } from '../../service/advance.service';
import { ListWithCountDto } from '../../dtos/list-with-count.dto';
import { extend } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-advances-kanban',
  standalone: true,
  imports: [
    KanbanAllModule
  ],
  templateUrl: './advances-kanban.component.html',
  styleUrl: './advances-kanban.component.scss'
})
export class AdvancesKanbanComponent {
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
  // @ts-expect-error could be null
  kanbanData: any[] = extend([], this.commAccData, null, true) as any[];
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
    private optionService: OptionsService,
    private advanceService: AdvanceService,
  ) {
    this.getAdvanceStatusFromOptions().then((cols) => {
      this.columns = cols;
      for(let i = 0; i < this.columns.length; i++) {
        this.columns[i].transitionColumns = this.setValidDropColumn(this.columns[i].keyField+'');
      }
    });
  }

  cardDoubleClick(event: any) {
    console.log('cardDoubleClick - event: ', event);
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
    const validCols: string[] = this.validColumns.get(advanceStatus) || [];
    // console.log('setValidDropColumn - validCols: ', validCols);
    return validCols;
  }

}
