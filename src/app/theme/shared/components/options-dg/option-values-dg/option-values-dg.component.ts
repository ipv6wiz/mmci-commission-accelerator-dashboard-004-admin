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


  constructor(
    public helpers: HelpersService,
    public modal: MatDialog,
    ) {
    effect(() => {
      console.log('dataGridRefreshSignal - effect entered');
      const dgrs = dataGridRefreshSignal();
      if(dgrs.refresh && dgrs.dataType === this.dataTypeTag) {
        this.refreshItemsList().then(() => true);
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
        data: {
          optionId
        }
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addOptionValue(event: any, option: OptionsEntity) {
    console.log('OptionValuesDgComponent - addOptionValue - option: ', option);
    this.openItemCreateFormModal(option.id);
  }

  openItemUpdateFormModal(optionId: string, optionValue: OptionValues) {
    this.modal.open(OptionValueFormDialogComponent, {
      data: {
        type: 'update',
        dataType: this.dataTypeTag,
        optionId,
        item: optionValue
      }
    });
  }

  editOptionValue(event: any, option: OptionsEntity, optionValue: OptionValues) {
    console.log('editOptionValue - option: ', option);
    console.log('editOptionValue - optionValue: ', optionValue);
    this.openItemUpdateFormModal(option.id, optionValue);
  }

  deleteOptionValue(event: any, option: OptionsEntity, optionValue: OptionValues) {
    console.log('deleteOptionValue - option: ', option);
    console.log('deleteOptionValue - optionValue: ', optionValue);
  }

  async refreshItemsList() {
    // // console.log('OptionsDgComponent - refreshItemsList - entered');
    // this.loadingItems = true;
    // // while(this.loadingItems) {
    // if(this.dgDataObj) {
    //   this.totalItemsCount = this.dgDataObj.count;
    //   this.dataSource = new MatTableDataSource<OptionsEntity>(this.dgDataObj.items);
    //   // console.log('OptionsDgComponent - refreshItemsList - items: ', this.advanceObj.items);
    //   // console.log('OptionsDgComponent - refreshItemsList - count: ', this.advanceObj.count);
    //   this.loadingItems = false;
    // }
    // }
    // console.log('OptionsDgComponent - refreshItemsList - EXIT');
  }
}
