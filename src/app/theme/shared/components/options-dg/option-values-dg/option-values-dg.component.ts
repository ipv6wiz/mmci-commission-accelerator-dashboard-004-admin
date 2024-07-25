import { Component, effect, Input, OnInit } from '@angular/core';
import { OptionValues } from '../../../entities/option-values.interface';
import { OptionsEntity } from '../../../entities/options.interface';
import { User } from '../../../entities/user.interface';
import { HelpersService } from '../../../service/helpers.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { OptionValueFormDialogComponent } from '../option-value-form-dialog/option-value-form-dialog.component';
import { dataGridRefreshSignal } from '../../../signals/data-grid-refresh.signal';
import { OptionsService } from '../../../service/options.service';
import { ApiResponse } from '../../../dtos/api-response.dto';

@Component({
  selector: 'app-option-values-dg',
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
    MatTable,
    MatToolbar,
    MatTooltip,
    MatHeaderCellDef
  ],
  templateUrl: './option-values-dg.component.html',
  styleUrl: './option-values-dg.component.scss'
})
export class OptionValuesDgComponent implements OnInit {
  @Input() values: OptionValues[] = [];
  @Input() option!: OptionsEntity;
  @Input() user!: User;

  valueColumnsToDisplay: string[] = ['key', 'value', 'sortOrder', 'displayValue'];
  valueColumnNamesToDisplay: string[] = ['Key', 'Value', 'Sort Order', 'Display Value'];
  valueColumnsToDisplayWithExpand: string[] = [...this.valueColumnsToDisplay, 'valueActions'];

  tableItemName: string = 'Option Value';
  dataTypeTag: string = 'optionValue';
  totalItemsCount: number = 0;

  loadingItems: boolean = false;


  constructor(
    public helpers: HelpersService,
    public modal: MatDialog,
    private service: OptionsService
    ) {
    effect(() => {
      const dgrs = dataGridRefreshSignal();
      console.log('OptionValuesDgComponent - dataGridRefreshSignal - effect entered - dgrs: ', dgrs);
      if(dgrs.refresh && dgrs.dataType === this.dataTypeTag && dgrs.dataId === this.option.id) {
        this.refreshItemsList(this.option.id).then(() => true);
      }
    });
  }

  ngOnInit() {
    console.log('ngOnInit - values: ', this.values);
  }

  openItemCreateFormModal(optionId: string) {
    this.modal.open(OptionValueFormDialogComponent, {
      data: {
        type: 'new',
        dataType: this.dataTypeTag,
        optionId
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addOptionValue(event: any, option: OptionsEntity) {
    console.log('OptionValuesDgComponent - addOptionValue - option: ', option);
    this.openItemCreateFormModal(option.id);
  }

  openItemUpdateFormModal(optionId: string, index: number, optionValue: OptionValues) {
    this.modal.open(OptionValueFormDialogComponent, {
      data: {
        type: 'update',
        dataType: this.dataTypeTag,
        optionId,
        item: optionValue,
        index
      }
    });
  }

  editOptionValue(event: any, option: OptionsEntity, optionValue: OptionValues) {
    console.log('editOptionValue - option: ', option);
    console.log('editOptionValue - optionValue: ', optionValue);
    const index: number = this.values.findIndex((valueItem: OptionValues) => optionValue.key === valueItem.key);
    this.openItemUpdateFormModal(option.id, index,  optionValue);
  }

  deleteOptionValue(event: any, option: OptionsEntity, optionValue: OptionValues) {
    console.log('deleteOptionValue - option: ', option);
    console.log('deleteOptionValue - optionValue: ', optionValue);
  }

  async refreshItemsList(optionId: string) {
    console.log('OptionsDgComponent - refreshItemsList - entered - optionId: ', optionId);
    this.loadingItems = true;
    const response: ApiResponse = await this.service.getOneOptionItem(optionId);
    console.log('OptionValuesDgComponent - refreshItemsList - response: ', response);
    if(response.statusCode === 200) {
      this.values = response.data.optionValues;
    } else {
      throw new Error(response.msg);
    }

  }
}
