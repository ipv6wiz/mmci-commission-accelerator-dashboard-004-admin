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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { NgForOf, NgStyle } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormFieldDto } from './dtos/form-field.dto';
import { ThemePalette } from '@angular/material/core';
import { HelpersService } from '../../service/helpers.service';
import { OptionsService } from '../../service/options.service';
import { ListWithCountDto } from '../../dtos/list-with-count.dto';
import { MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { mmciFormSubmitSignal } from './signals/mmci-form-submit.signal';
import { SelectDto } from './dtos/select.dto';

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
    MatSelectModule,
    MatSuffix,
    MatToolbar,
    NgForOf,
    NgxMaskDirective,
    NgxMaskPipe,
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
  @Input() config!: SelectDto[];

  formGroup!: FormGroup;
  fields!: Map<string, FormFieldDto>;
  controls!: {[p: string]: FormControl};
  fieldIdPrefix: string = '';
  dataTypeTag: string = '';
  formTag: string = '';
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
    private optionsService: OptionsService,
  ) {}

  ngOnInit() {
    // console.log('MmciFormMatComponent - ngOnInit - data: ', this.data);
    // console.log('MmciFormMatComponent - ngOnInit - config: ', this.config);
    this.unpackConfig();
    // const fieldsArr: FormFieldDto[] = this.populateFormFields();
    // console.log('MmciFormMatComponent - ngOnInit - fieldsArr: ', this.fieldsArr);
    this.rows = this.helpers.populateRows(this.fieldsArr);
    this.fields = new Map<string, FormFieldDto>(this.fieldsArr.map((obj: FormFieldDto) => [obj.fcn, obj]));
    this.controls = this.helpers.createControls(this.fields, this.data);
    console.log('MMCI Form - constructor - controls: ', this.controls);
    // console.log('Escrow Form - constructor - typeof controls: ', typeof this.controls);
    this.formGroup = this.formBuilder.group(this.controls);
    this.chipsList = new Map<string, string[]>();
    this.loadChipsList(this.chipListArr).then(() => {
      this.loadingForm = false;
    });
  }

  unpackConfig() {
    this.config.forEach((item: SelectDto) => {
      // @ts-ignore
      this[item.key] = item.value;
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

  chipListChange(event: {key: string, value: any} ) {
    // console.log('chipListChange - event: ', event);
    this.formGroup.controls[event.key].setValue(event.value);
    // console.log('chipListChange - fcn - value: ', this.formGroup.controls[event.key].value);
    this.formGroup.controls[event.key].markAsDirty();
  }

  async onSubmit(event: any) {
    console.log('onSubmit - event: ', event);
    console.log('onSubmit - values: ', this.formGroup.value);
    // {action: 'submit', formType: 'new', formData: {}}
    mmciFormSubmitSignal.set({action: 'submit', formType: this.data.type, formData: this.formGroup.value});
  }

  onDateChange(event: any) {
    console.log('onDateChange - event: ', event);
    const date = event.value;
    console.log('onDateChange - date: ', date);
    const ctrlId: string = event.targetElement.id;
    console.log('******* >>> onDateChange - ctrlId: ', ctrlId);
    const ctrlNameParts = ctrlId.split('-');
    const formGroup = ctrlNameParts[0];
    const fcn = ctrlNameParts[1];
    console.log(`******* >>> onDateChange - formGroup: ${formGroup} - control: ${fcn}`);
    const localDate = date.toLocaleDateString();
    // console.log('******* >>> onDateChange - date: ', localDate);
    const isoDate = this.helpers.makeIsoDate(localDate);
    // console.log('******* >>> onDateChange - isoDate: ', isoDate);
    this.formGroup.controls[fcn].setValue(isoDate);
  }

  checkboxChange(event: any) {
    console.log('checkboxChange - event: ', event);
    const fieldNameParts = event.source.name.split('.');
    console.log('checkboxChange - fcn: ', fieldNameParts[1]);
    if(this.fields.has(fieldNameParts[1])) {
      // @ts-ignore
      this.fields.get(fieldNameParts[1]).hide = !event.checked;
      console.log('checkboxChange - fcn - hide: ', this.fields.get(fieldNameParts[1]));
    }
  }

  onFieldChange(event: any) {
    // console.log('***** >>>>> fieldChange - event: ', event);
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
        // console.log('***** >>>>> fieldChange - doAutoCap: ', doAutoCap);
        if(doAutoCap) {
          const capFirst = this.helpers.autoCapitalize(text);
          this.formGroup.controls[fcn].setValue(capFirst);
        }
      }
    }
  }
}

// fields.push({
//   fieldLabel: '',
//   placeholder: '',
//   fcn: '',
//   type: '',
//   required: true,
//   disabled: false,
//   validators: [],
//   width: 0, // percentage
//   rowCol: '',
//   autoCapitalize: '',
//   mask: '',
//   addrObj: null,
//   pickerId: '',
//   startView: 'month',
//   storedFormat: '',
//   options: [],
//   conditional: false, // if true precede the field with a checkbox
//   defaultCondition: true, // render the field
//   condFieldLabel: '',
//   condPlaceholder: '',
//   condFcn: '',
//   condRequired: true,
// });
