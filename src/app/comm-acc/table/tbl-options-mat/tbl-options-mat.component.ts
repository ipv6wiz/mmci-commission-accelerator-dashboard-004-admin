import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OptionValues } from '../../../theme/shared/entities/option-values.interface';
import { OptionsService } from '../../../theme/shared/service/options.service';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../../../theme/shared/dtos/api-response.dto';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { Options } from '../../../theme/shared/entities/options.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tbl-options-mat',
  standalone: true,
  imports: [
    CardComponent,
    MatProgressSpinner,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatTooltip,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef
  ],
  templateUrl: './tbl-options-mat.component.html',
  styleUrl: './tbl-options-mat.component.scss',
  animations: [
      trigger('detailExpand', [
        state('collapsed,void', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ]
})
export class TblOptionsMatComponent implements OnInit{
  loadingOptions: boolean = true;
  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  public loadSpinnerDiameter: string = '50';
  optionsDataSource: any;
  optionColumnsToDisplay: string[] = ['type'];
  optionColumnNamesToDisplay: string[] = ['Type', 'Actions'];
  optionColumnsToDisplayWithExpand: string[] = [...this.optionColumnsToDisplay, 'optionActions'];
  valueColumnsToDisplay: string[] = ['key', 'value', 'sortOrder', 'displayValue'];
  valueColumnNamesToDisplay: string[] = ['Key', 'Value', 'Sort Order', 'Display Value'];
  expandedOption: Options | null = null;

  constructor(
    private optionsService: OptionsService,
  ) {}

  async ngOnInit() {
    await this.refreshOptionsList();
  }

  async refreshOptionsList() {
    this.loadingOptions = true;
    this.optionsDataSource =  await this.loadOptionsData();
    this.expandedOption = null;
  }

  onExpandRow(event: any, option: Options) {
    event.stopPropagation();
    event.stopPropagation();
    console.log('onExpandRow - event: ', event);
    console.log('onExpandRow - option: ', option);
    console.log('onExpandRow - expandedClient (before): ', this.expandedOption);
    if(this.expandedOption === null) {
      this.expandedOption = option;
    } else {
      this.expandedOption = null;
    }
    console.log('onExpandRow - expandedClient (after): ', this.expandedOption);
  }

  async loadOptionsData() {
    const response: ApiResponse = await  lastValueFrom(this.optionsService.getAll(), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    this.loadingOptions = false;
    return response.data.options
  }

  addOption(event: any) {
    console.log('addOption - event: ', event);
  }

  editOption(event: any, option: Options) {
    console.log('editOption - option: ', option);
  }

  deleteOption(event: any, option: Options) {
    console.log('deleteOption - option: ', option);
  }

  addOptionValue(event: any, option: Options, optionValue: OptionValues) {
    console.log('addOptionValue - option: ', option);
    console.log('addOptionValue - optionValue: ', optionValue);
  }

  editOptionValue(event: any, option: Options, optionValue: OptionValues) {
    console.log('editOptionValue - option: ', option);
    console.log('editOptionValue - optionValue: ', optionValue);
  }

  deleteOptionValue(event: any, option: Options, optionValue: OptionValues) {
    console.log('deleteOptionValue - option: ', option);
    console.log('deleteOptionValue - optionValue: ', optionValue);
  }

}
