import { Component, Input, OnInit } from '@angular/core';
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
