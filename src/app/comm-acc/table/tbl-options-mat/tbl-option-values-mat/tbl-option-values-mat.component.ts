import { Component, Input, OnInit } from '@angular/core';
import { OptionValues } from '../../../../theme/shared/entities/option-values.interface';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { OptionsEntity } from '../../../../theme/shared/entities/options.interface';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatToolbar } from '@angular/material/toolbar';
import { HelpersService } from '../../../../theme/shared/service/helpers.service';
import { User } from '../../../../theme/shared/entities/user.interface';

@Component({
  selector: 'app-tbl-option-values-mat',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatIconButton,
    MatTooltip,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatToolbar
  ],
  templateUrl: './tbl-option-values-mat.component.html',
  styleUrl: './tbl-option-values-mat.component.scss'
})
export class TblOptionValuesMatComponent implements OnInit{
  @Input() values: OptionValues[] = [];
  @Input() option!: OptionsEntity;
  @Input() user!: User;

  valueColumnsToDisplay: string[] = ['key', 'value', 'sortOrder', 'displayValue'];
  valueColumnNamesToDisplay: string[] = ['Key', 'Value', 'Sort Order', 'Display Value'];
  valueColumnsToDisplayWithExpand: string[] = [...this.valueColumnsToDisplay, 'valueActions'];

  constructor(protected helpers: HelpersService,) {
  }

  ngOnInit() {
    console.log('ngOnInit - values: ', this.values);
  }

  addOptionValue(event: any, option: OptionsEntity) {
    console.log('addOptionValue - option: ', option);
  }

  editOptionValue(event: any, option: OptionsEntity, optionValue: OptionValues) {
    console.log('editOptionValue - option: ', option);
    console.log('editOptionValue - optionValue: ', optionValue);
  }

  deleteOptionValue(event: any, option: OptionsEntity, optionValue: OptionValues) {
    console.log('deleteOptionValue - option: ', option);
    console.log('deleteOptionValue - optionValue: ', optionValue);
  }

  refreshOptionValues() {

  }
}
