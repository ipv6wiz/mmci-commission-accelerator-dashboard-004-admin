import { AfterViewChecked, Component, effect, OnInit, ViewChild } from '@angular/core';
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
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { OptionsEntity } from '../../../theme/shared/entities/options.interface';
import { MatIcon } from '@angular/material/icon';
import { TblOptionValuesMatComponent } from './tbl-option-values-mat/tbl-option-values-mat.component';
import { MatToolbar } from '@angular/material/toolbar';
import { NGXLogger } from 'ngx-logger';
import { MatDialog } from '@angular/material/dialog';
import { TblOptionsFormMatComponent } from './tbl-options-form-mat/tbl-options-form-mat.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { optionTypeListChangeSignal } from '../../../theme/shared/signals/option-type-list-change.signal';
import { User } from '../../../theme/shared/entities/user.interface';
import { AuthenticationService } from '../../../theme/shared/service';
import { HelpersService } from '../../../theme/shared/service/helpers.service';
import { ListWithCountDto } from '../../../theme/shared/dtos/list-with-count.dto';

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
  optionsDataSource!: MatTableDataSource<OptionsEntity>;
  totalOptionCount: number = 0;
  optionColumnsToDisplay: string[] = ['optionName'];
  optionColumnNamesToDisplay: string[] = ['Type', 'Actions'];
  optionColumnsToDisplayWithExpand: string[] = [...this.optionColumnsToDisplay, 'expand'];

  expandedOption: OptionsEntity | null = null;

  user: User;

  dataTypeTag: string = 'options';

  constructor(
    private optionsService: OptionsService,
    private authService: AuthenticationService,
    protected helpers: HelpersService,
    public modal: MatDialog,
    private logger: NGXLogger
  ) {
    this.user = this.authService.getLocalUser();
    effect(async () => {
      const optionTypeChange: {master: OptionsEntity, masterId: string, update: boolean, user: User} = optionTypeListChangeSignal();
      if(this.optionsDataSource) {
        // const dsIndex: number = this.optionsDataSource.data.findIndex((item) => item.id === optionTypeChange.masterId);
        // console.log('effect - dsIndex: ', dsIndex);
        console.log('effect - master: ', optionTypeChange.master);
        const response = await lastValueFrom( this.optionsService.updateOptionById(optionTypeChange.masterId, optionTypeChange.master));
        console.log('effect - response: ', response);
      }
    });
  }

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
    const optionsDataObj: ListWithCountDto = await this.loadOptionsData();
    this.totalOptionCount = optionsDataObj.count;
    this.optionsDataSource = new MatTableDataSource<OptionsEntity>(optionsDataObj.items);
    console.log('ngOnInit - optionsDataSource - data: ', this.optionsDataSource.data);
    this.loadingOptions = false;
    this.expandedOption = null;
  }

  onExpandRow(event: any, option: OptionsEntity) {
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

  async loadOptionsData(): Promise<ListWithCountDto> {
    return  await  this.optionsService.loadAllOptionItems();
  }

  openOptionTypeFormUpdateModal(option: OptionsEntity, index: number) {
    this.modal.open(TblOptionsFormMatComponent, {
      data: {
        type: 'update',
        dataType: this.dataTypeTag,
        option,
        index
      }
    });
  }

  addOption(event: any) {
    console.log('addOption - event: ', event);
  }

  editOption(event: any, option: OptionsEntity) {
    console.log('editOption - option: ', option);
    const index = this.optionsDataSource.data.findIndex((item: OptionsEntity) => item.type === option.type);
    console.log('editOption  - index: ', index);
    this.openOptionTypeFormUpdateModal(option, index);
  }

  deleteOption(event: any, option: OptionsEntity) {
    console.log('deleteOption - option: ', option);
  }

  onPageEvent(event: any) {
    console.log('onPageEvent - event: ', event);
    console.log('onPageEvent - dataSource - paginator: ', this.optionsDataSource.paginator)
  }

}
