import { Component, Input, OnInit } from '@angular/core';
import { AddressFormComponent } from '../address-form/address-form.component';
import { ChipListComponent } from '../chip-list/chip-list.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';

import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { NgForOf, NgStyle } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormFieldDto } from '../../dtos/form-field.dto';
import { ThemePalette } from '@angular/material/core';
import { HelpersService } from '../../service/helpers.service';
import { UsersService } from '../../service/users.service';
import { OptionsService } from '../../service/options.service';
import { dataGridRefreshSignal } from '../../signals/data-grid-refresh.signal';
import { ListWithCountDto } from '../../dtos/list-with-count.dto';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-mmci-form-mat',
  standalone: true,
  imports: [
    AddressFormComponent,
    ChipListComponent,
    FormsModule,
    MatButton,
    MatCheckbox,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatProgressSpinner,
    MatSelect,
    MatSuffix,
    MatToolbar,
    NgForOf,
    NgxMaskDirective,
    ReactiveFormsModule,
    MatDialogContent,
    NgStyle,
    MatDialogTitle,
    MatDialogClose
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './mmci-form-mat.component.html',
  styleUrl: './mmci-form-mat.component.scss'
})
export class MmciFormMatComponent implements OnInit{
  @Input() data!: any;
  @Input() fieldsArr!: FormFieldDto[];
  @Input() chipListArr!: string[];

  formGroup!: FormGroup;
  fields!: Map<string, FormFieldDto>;
  controls!: {[p: string]: FormControl};
  fieldIdPrefix: string = 'user';
  dataTypeTag: string = 'users';
  formTag: string = 'User';
  roles: string[] = [];
  loadingForm: boolean = true;
  loadSpinnerColor: ThemePalette = 'primary';
  loadSpinnerMode: ProgressSpinnerMode = 'indeterminate';
  loadSpinnerDiameter: string = '50';
  chipsList!: Map<string, string[]>;

  rows: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private helpers: HelpersService,
    private service: UsersService,
    private optionsService: OptionsService,
  ) {

  }


  ngOnInit() {
    console.log('ngOnInit - data: ', this.data);

    // const fieldsArr: FormFieldDto[] = this.populateFormFields();
    console.log('ngOnInit - fieldsArr: ', this.fieldsArr);
    this.populateRows(this.fieldsArr);
    this.fields = new Map<string, FormFieldDto>(this.fieldsArr.map((obj: FormFieldDto) => [obj.fcn, obj]));
    this.controls = this.helpers.createControls(this.fields, this.data);
    // console.log('Escrow Form - constructor - controls: ', this.controls);
    // console.log('Escrow Form - constructor - typeof controls: ', typeof this.controls);
    this.formGroup = this.formBuilder.group(this.controls);
    this.chipsList = new Map<string, string[]>();
    this.loadChipsList(this.chipListArr).then(() => {
      this.loadingForm = false;
    });
  }

  async loadChipsList(chipTypeArr: string[]) {
    for(let i = 0; i < chipTypeArr.length; i++) {
      const chipType = chipTypeArr[i];
      console.log('loadChipsList - chipType: ', chipType);
      const chipsObj: ListWithCountDto = await this.optionsService.loadValuesItemsForSelect(chipType);
      console.log('loadChipsList - chipsObj: ', chipsObj);
      // chipsObj.items.forEach((item:any) => {this.roles.push(item.value)});
      const values: string[] = [];
      chipsObj.items.forEach((item:any) => {
        values.push(item.value);
      });
      this.chipsList.set(chipType, values)
    }
  }

  populateRows(fieldsArr: FormFieldDto[]) {
    // console.log('populateRows - fieldsArr: ', fieldsArr);
    fieldsArr.sort((a: FormFieldDto,b: FormFieldDto): number => {
      if(!a.rowCol || !b.rowCol) {
        return 0;
      }
      if(a.rowCol < b.rowCol) {
        return -1;
      } else if(a.rowCol > b.rowCol) {
        return 1;
      }
      return 0;
    })
    fieldsArr.forEach((field: FormFieldDto) => {
      let row: number = 0
      if(field.rowCol) {
        const rowColParts = field.rowCol.split('.');
        row = parseInt(rowColParts[0], 10);
      } else {
        row++;
      }
      // const col: number = parseInt(rowColParts[1], 10);
      // console.log(`row: ${row} col: ${col} rows.length: ${this.rows.length}`);
      if(row > this.rows.length) {
        this.rows.push([]);
      }
      this.rows[row - 1].push(field);
    });
    // console.log('populateRows - rows: ', this.rows);
  }

  chipListChange(event: {key: string, value: any} ) {
    // console.log('chipListChange - event: ', event);
    this.formGroup.controls[event.key].setValue(event.value);
    // console.log('chipListChange - fcn - value: ', this.formGroup.controls[event.key].value);
    this.formGroup.controls[event.key].markAsDirty();
  }

  async onSubmit(event: any) {
    console.log('onSubmit - event: ', event);
    console.log('onSubmit - values: ', this.formGroup.value);
    let response;
    if(this.data.type === 'new') {
      response = await this.service.createItem(this.formGroup.value);
    } else if(this.data.type === 'update') {
      response = await this.service.updateItem(this.data.item.id, this.formGroup.value);
    }
    dataGridRefreshSignal.set({refresh: true, dataType: this.dataTypeTag })
    console.log('onSubmit - response: ', response);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDateChange(event: any) {
    console.log('onDateChange');
  }

  onFieldChange(event: any) {
    console.log('***** >>>>> fieldChange - event: ', event);
    console.log(`***** >>>>> fieldChange - id: ${event.target.id} - value: ${event.target.value}`);
    const text = event.target.value;
    const ctrlId = event.target.id;
    const ctrlNameParts = ctrlId.split('-');
    // const formGroup = ctrlNameParts[0];
    const fcn = ctrlNameParts[1];

    if(this.fields.has(fcn)) {
      const field: FormFieldDto | undefined = this.fields.get(fcn);
      if(field) {
        const doAutoCap: boolean = !!field.autoCapitalize;
        console.log('***** >>>>> fieldChange - doAutoCap: ', doAutoCap);
        if(doAutoCap) {
          const capFirst = this.helpers.autoCapitalize(text);
          this.formGroup.controls[fcn].setValue(capFirst);
        }
      }
    }
  }

}
