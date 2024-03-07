import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  MatTable, MatTableDataSource
} from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OptionsService } from '../../../theme/shared/service/options.service';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../../../theme/shared/dtos/api-response.dto';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { Options } from '../../../theme/shared/entities/options.interface';
import { MatIcon } from '@angular/material/icon';
import { TblOptionValuesMatComponent } from './tbl-option-values-mat/tbl-option-values-mat.component';
import { MatToolbar } from '@angular/material/toolbar';
import { NGXLogger } from 'ngx-logger';
import { MatDialog } from '@angular/material/dialog';
import { TblOptionsFormMatComponent } from './tbl-options-form-mat/tbl-options-form-mat.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
    MatRowDef,
    TblOptionValuesMatComponent,
    MatToolbar,
    MatPaginatorModule,
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
export class TblOptionsMatComponent implements OnInit, AfterViewChecked {
  // @ts-expect-error not defined
  @ViewChild('paginator') paginator: MatPaginator;
  loadingOptions: boolean = true;
  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  public loadSpinnerDiameter: string = '50';
  optionsDataSource!: MatTableDataSource<Options>;
  totalOptionCount: number = 0;
  optionColumnsToDisplay: string[] = ['type'];
  optionColumnNamesToDisplay: string[] = ['Type', 'Actions'];
  optionColumnsToDisplayWithExpand: string[] = [...this.optionColumnsToDisplay, 'expand'];

  expandedOption: Options | null = null;

  constructor(
    private optionsService: OptionsService,
    public modal: MatDialog,
    private logger: NGXLogger
  ) {  }

  async ngOnInit() {
    console.log('ngOnInit');
    await this.refreshOptionsList();
  }

  ngAfterViewChecked() {
    if(!this.loadingOptions && !this.optionsDataSource.paginator) {
        this.optionsDataSource.paginator = this.paginator;
    }
  }

  async refreshOptionsList() {
    this.loadingOptions = true;
    const optionsDataObj: {options: Options[], count: number } = await this.loadOptionsData();
    this.totalOptionCount = optionsDataObj.count;
    this.optionsDataSource = new MatTableDataSource<Options>(optionsDataObj.options);
    console.log('ngOnInit - optionsDataSource - data: ', this.optionsDataSource.data);
    this.loadingOptions = false;
    this.expandedOption = null;
  }

  onExpandRow(event: any, option: Options) {
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

  async loadOptionsData(): Promise<{options: Options[], count: number }> {
    const response: ApiResponse = await  lastValueFrom(this.optionsService.getAll(), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  openOptionFormModal(option: Options, index: number) {
    this.modal.open(TblOptionsFormMatComponent, {
      data: {
        option,
        index
      }
    });
  }

  addOption(event: any) {
    console.log('addOption - event: ', event);
  }

  editOption(event: any, option: Options) {
    console.log('editOption - option: ', option);
    const index = this.optionsDataSource.data.findIndex((item: Options) => item.type === option.type);
    console.log('editOption  - index: ', index);
    this.openOptionFormModal(option, index);
  }

  deleteOption(event: any, option: Options) {
    console.log('deleteOption - option: ', option);
  }

  onPageEvent(event: any) {
    console.log('onPageEvent - event: ', event);
    console.log('onPageEvent - dataSource - paginator: ', this.optionsDataSource.paginator)
  }

}
