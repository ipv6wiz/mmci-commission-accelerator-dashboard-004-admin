import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OptionsDgComponent } from '../../../theme/shared/components/options-dg/options-dg.component';
import { ListWithCountDto } from '../../../theme/shared/dtos/list-with-count.dto';
import { OptionsService } from '../../../theme/shared/service/options.service';
import { HelpersService } from '../../../theme/shared/service/helpers.service';
import { MatDialog } from '@angular/material/dialog';
import { dataGridRefreshSignal } from '../../../theme/shared/signals/data-grid-refresh.signal';
import {
  OptionTypeFormDialogComponent
} from '../../../theme/shared/components/options-dg/option-type-form-dialog/option-type-form-dialog.component';
import { OptionsEntity } from '../../../theme/shared/entities/options.interface';

@Component({
  selector: 'app-tbl-options-mat-mmci',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinner,
    MatToolbarModule,
    OptionsDgComponent,
  ],
  templateUrl: './tbl-options-mat-mmci.component.html',
  styleUrl: './tbl-options-mat-mmci.component.scss'
})
export class TblOptionsMatMmciComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  loadingItems: boolean = true;
  public loadSpinnerColor: ThemePalette = 'primary';
  public loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  public loadSpinnerDiameter: string = '50';
  tableTitle: string = 'Options (Dropdowns, etc.)';
  tableItemName: string = 'Option Type';
  dataSource!: MatTableDataSource<OptionsEntity>;
  dataTypeTag: string = 'options';
  optionItemsObj: any;

  constructor(
    public modal: MatDialog,
    private service: OptionsService,
    public helpers: HelpersService
  ) {
    effect(() => {
      console.log('dataGridRefreshSignal - effect entered');
      const dgrs = dataGridRefreshSignal();
      if(dgrs.refresh && dgrs.dataType === this.dataTypeTag) {
        this.refreshItemsList().then(() => true);
      }
    });
  }

  async ngOnInit() {
    await this.refreshItemsList().then(() => {
      console.log('TblOptionsMatMmciComponent - ngOnInit - refreshItemsList - done')
    });
  }

  addItem() {
    this.openItemCreateFormModal();
  }

  openItemCreateFormModal() {
    this.modal.open(OptionTypeFormDialogComponent, {
      data: {
        type: 'new',
        dataType: this.dataTypeTag,
      }
    });
  }

  editItem() {

  }

  openItemUpdateFormModal(item: OptionsEntity) {
    this.modal.open(OptionTypeFormDialogComponent, {
      data: {
        type: 'update',
        dataType: this.dataTypeTag,
        item
      }
    });
  }

  deleteItem() {

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refreshItemsList(sortBy: string = 'optionName', filter: string = '') {
    console.log('>>>>>>>> refreshItemsList <<<<<<<<');
    this.loadingItems = true;
    this.optionItemsObj = await this.loadItemsData(sortBy);
    this.loadingItems = false;
    // dataGridRefreshSignal.set({refresh: true, dataType: this.dataTypeTag});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async loadItemsData(sortBy: string): Promise<ListWithCountDto>{
    return await this.service.loadAllOptionItems();
  }

}
