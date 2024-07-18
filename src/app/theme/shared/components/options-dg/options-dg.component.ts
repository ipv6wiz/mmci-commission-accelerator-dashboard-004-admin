import { AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NestedColumnPipe } from '../../pipes/nested-column.pipe';
import { MatBoolDisplayPipe } from '../../pipes/mat-bool-display.pipe';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { ListWithCountDto } from '../../dtos/list-with-count.dto';
import { OptionsEntity } from '../../entities/options.interface';
import { MatDialog } from '@angular/material/dialog';
import { HelpersService } from '../../service/helpers.service';
import { OptionTypeFormDialogComponent } from './option-type-form-dialog/option-type-form-dialog.component';

@Component({
  selector: 'app-options-dg',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatTableModule,
    MatPaginatorModule,
    NgxMaskPipe,
    NestedColumnPipe,
    MatBoolDisplayPipe,
    MatTooltip,
    MatIconButton,
    DatePipe
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './options-dg.component.html',
  styleUrl: './options-dg.component.scss'
})
export class OptionsDgComponent implements OnInit, AfterViewChecked{
  @ViewChild('paginator') paginator!: MatPaginator;
  @Input() loadingItems: boolean = true;
  @Input() dgDataObj!: ListWithCountDto;

  tableTitle: string = 'Options (Dropdowns, etc.)';
  tableItemName: string = 'Option Type';
  dataSource!: MatTableDataSource<OptionsEntity>;
  dataTypeTag: string = 'optionType';
  totalItemsCount: number = 0;
  columnsToDisplay: string[] = [
    'optionName'
  ];
  columnNamesToDisplay: string[] = ['Type', 'Actions'];
  columnsToDisplayWithActions: string[] = [...this.columnsToDisplay, 'expand'];
  columnsConfig: Map<string, any> = new Map<string, any>();

  constructor(
    public modal: MatDialog,
    public helpers: HelpersService
  ) {}

  async ngOnInit() {
    await this.refreshItemsList();
  }

  async ngAfterViewChecked() {
    // console.log('OptionsDgComponent - ngAfterViewChecked - entered');
    if(this.dataSource && ( !this.loadingItems && !this.dataSource.paginator)) {
      // console.log('OptionsDgComponent - ngAfterViewChecked - loading paginator & data');
      this.dataSource.paginator = this.paginator;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refreshItemsList(sortBy: string = 'optionName', filter: string = '') {
    // console.log('OptionsDgComponent - refreshItemsList - entered');
    this.loadingItems = true;
    // while(this.loadingItems) {
    if(this.dgDataObj) {
      this.totalItemsCount = this.dgDataObj.count;
      this.dataSource = new MatTableDataSource<OptionsEntity>(this.dgDataObj.items);
      // console.log('OptionsDgComponent - refreshItemsList - items: ', this.advanceObj.items);
      // console.log('OptionsDgComponent - refreshItemsList - count: ', this.advanceObj.count);
      this.loadingItems = false;
    }
    // }
    // console.log('OptionsDgComponent - refreshItemsList - EXIT');
  }

  openItemUpdateFormModal(item: OptionsEntity, index: number) {
    this.modal.open(OptionTypeFormDialogComponent, {
      data: {
        type: 'update',
        dataType: this.dataTypeTag,
        item,
        index
      }
    });
  }

  openItemCreateFormModal() {
    this.modal.open(OptionTypeFormDialogComponent, {
      data: {
        type: 'new',
        dataType: this.dataTypeTag
      }
    });
  }

}
