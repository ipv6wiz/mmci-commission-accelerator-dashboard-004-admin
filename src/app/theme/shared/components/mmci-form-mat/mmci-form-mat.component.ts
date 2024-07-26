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
import { MatSelectModule } from '@angular/material/select';
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
import { BankFormComponent } from '../bank-form/bank-form.component';
import { OptionValue } from '../../entities/option-values.interface';

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
    MatDialogClose,
    BankFormComponent
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
  @Input() mode: string = 'edit';
  @Input() subForm: boolean = false;

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
  formUUID: string = '';
  showToolbar: boolean = true;
  topSubmit: boolean = false;

  rows: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private helpers: HelpersService,
    private optionsService: OptionsService,
  ) {

  }

  ngOnInit() {
    console.log('MmciFormMatComponent - ngOnInit - data: ', this.data);
    console.log('MmciFormMatComponent - ngOnInit - config: ', this.config);
    this.unpackConfig();
    console.log('MmciFormMatComponent - ngOnInit - showToolBar: ', this.showToolbar);
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

  selectionChange(event: any, field: FormFieldDto) {
    // console.log('MmciFormMatComponent - selectionChange - event: ', event);
    // console.log('MmciFormMatComponent - selectionChange - option value: ', event.value);
    // console.log('MmciFormMatComponent - selectionChange - field: ', field);
    // console.log('MmciFormMatComponent - selectionChange - data: ', this.data);
    if(field.associatedToField && field.associatedFieldFormat) {
      // console.log('MmciFormMatComponent - selectionChange - processing - associatedField');
      if(field.options) {
        const promoIndex: number = field.options.findIndex((option: OptionValue) => option.key === event.value);
        const promoData: OptionValue = field.options[promoIndex];
        const dataParts: string[] = field.associatedFieldFormat.split(':');
        let assocFieldValueString: string = '';
        dataParts.forEach((part: string) => {
          let data: string =  `${promoData[ part as keyof OptionValue]}`;
          data = data.toLowerCase();
          if(part === 'displayValue') {
            if(['percent', 'fixed', '%', '$'].includes(data)) {
              switch(data) {
                case 'percent':
                case '%':
                  assocFieldValueString = assocFieldValueString.trim() + '% ';
                  break;
                case 'fixed':
                case '$':
                  assocFieldValueString = '$'+assocFieldValueString;
              }
            }
          } else {
            assocFieldValueString += `${promoData[ part as keyof OptionValue]} `
          }

        })
        this.formGroup.controls[field.associatedToField].setValue(assocFieldValueString.trim() );
      }

    }
  }

  isReadOnly(field: FormFieldDto): boolean {
    return this.mode === 'view' || (field.readOnly !== undefined && field.readOnly);
  }

  unpackConfig() {
    this.config.forEach((item: SelectDto) => {
      const value = this.helpers.convertBoolString(item.value);
      console.log('MmciFormMatComponent - unpackConfig - value: ', value);

      // @ts-expect-error item maybe undefined
      this[item.key] = value;
      console.log('MmciFormMatComponent - unpackConfig - fieldIdPrefix: ',this.fieldIdPrefix)
    });
  }

  async loadChipsList(chipTypeArr: string[]) {
    if(chipTypeArr) {
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
  }

  chipListChange(event: {key: string, value: any} ) {
    // console.log('chipListChange - event: ', event);
    this.formGroup.controls[event.key].setValue(event.value);
    // console.log('chipListChange - fcn - value: ', this.formGroup.controls[event.key].value);
    this.formGroup.controls[event.key].markAsDirty();
  }

  async onSubmit(event: any) {
    console.log('MmciFormMatComponent - onSubmit - event: ', event);
    console.log('MmciFormMatComponent - onSubmit - values: ', this.formGroup.value);
    this.populateDefaultValues();
    mmciFormSubmitSignal.set(
      {
        action: 'submit',
        dataType: this.data.dataType,
        formType: this.data.type,
        formData: this.formGroup.value,
        formUUID: this.formUUID
      });
  }

  populateDefaultValues() {
    this.fields.forEach((field: FormFieldDto, key: string) => {
      if(field.default) {
        if(this.formGroup.controls[key].value == null || this.formGroup.controls[key].value === '') {
          let value: any;
          if(field.default.startsWith('#')) {
            const fcn: string = field.default.substring(field.default.indexOf('#') + 1);
            if(fcn.includes('.')) {
              const fcnParts = fcn.split('.');
              // console.log('fcnParts - ', fcnParts);
              // console.log('formGroup.controls: ', this.formGroup.controls);
              // @ts-expect-error value maybe undefined
              value = this.formGroup.controls[fcnParts[0]].controls[fcnParts[1]].value;
              // console.log('populateDefaultValues - value (after): ', value);
            } else {
              value = this.formGroup.controls[fcn].value;
            }
          } else {
            value = field.default;
          }
          this.formGroup.controls[key].setValue(value);
        }
      }
    });
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
      // @ts-expect-error value maybe undefined
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
