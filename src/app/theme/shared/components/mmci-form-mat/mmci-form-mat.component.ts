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
import { PromoCodeService } from '../../service/promo-code.service';
import { PromoCodeDto } from '../../dtos/promo-code.dto';
import { mmciFormModeChangeSignal } from './signals/mmci-form-mode-change.signal';

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
  justTag: boolean = false;
  dataObjType: string = 'item';

  rows: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private helpers: HelpersService,
    private optionsService: OptionsService,
    private promoCodeService: PromoCodeService
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
    this.controls = this.helpers.createControls(this.fields, this.data, this.dataObjType);
    console.log('MMCI Form - constructor - controls: ', this.controls);
    // console.log('Escrow Form - constructor - typeof controls: ', typeof this.controls);
    this.formGroup = this.formBuilder.group(this.controls);
    this.chipsList = new Map<string, string[]>();
    this.loadChipsList(this.chipListArr).then(() => {
      this.loadingForm = false;
    });
    this.populateDefaultValues();
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

  onCancel(event: any) {
    console.log('MmciFormMatComponent - onCancel - event: ', event);
    mmciFormModeChangeSignal.set({action: 'change', mode: 'view', dataTypeTag: this.dataTypeTag})
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
          console.debug('MMCI Form - populateDefaultValues - value: ', value);
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

  selectionChange(event: any, field: FormFieldDto) {
    // console.log('MmciFormMatComponent - selectionChange - event: ', event);
    // console.log('MmciFormMatComponent - selectionChange - option value: ', event.value);
    // console.log('MmciFormMatComponent - selectionChange - field: ', field);
    // console.log('MmciFormMatComponent - selectionChange - data: ', this.data);
    let linkedFieldValueString: string = '';
    if(field.linkedField && field.linkedFieldSource && field.linkedFieldSourceField) {
      if(field.linkedFieldSource === 'PromoCode') {
        if(field.options) {
          const index: number = field.options.findIndex((o: PromoCodeDto) => o.code === event.value);
          if(index !== -1) {
            const pc: PromoCodeDto = field.options[index];
            linkedFieldValueString = field.options[index][field.linkedFieldSourceField];
            this.formGroup.controls[field.linkedField].setValue(linkedFieldValueString.trim() );
            this.getValuesForPromoCodeCalc(pc);
          }
        }
      }
      this.formGroup.controls[field.linkedField].setValue(linkedFieldValueString.trim() );
    }
  }

  onFieldChange(event: any, field: FormFieldDto) {
    console.log('***** >>>>> fieldChange - field: ', field);
    console.log(`***** >>>>> fieldChange - id: ${event.target.id} - value: ${event.target.value}`);

    const text = event.target.value;
    const fcn = field.fcn;
      if(field) {
        const doAutoCap: boolean = field.autoCapitalize !== undefined && field.autoCapitalize === 'words';
        if(doAutoCap) {
          const capFirst = this.helpers.autoCapitalize(text);
          this.formGroup.controls[fcn].setValue(capFirst);
        }
        if(field.calculated && field.associatedFromField && field.associatedToField) {
          console.log('Calculated Field');
          if(field.associatedFromField === 'promoCode') {
            // do PromoCode  calculation
            // expected fields:
            // promoCode Select value to look up discount
            // amountApproved - might not be set yet
            // advanceFee - field that triggered this
            // advanceFeeDiscount - calculated
            // amountToClient - calculated
            // amountToCommAcc - calculated
            const assocFromFieldValue: any = this.formGroup.controls[field.associatedFromField].value;
            console.log('***** >>>>> fieldChange - calculated - assocFromFieldValue: ', assocFromFieldValue);
            const assocFromFieldDef: FormFieldDto | undefined = this.fields.get(field.associatedFromField);
            if(assocFromFieldDef) {
              if(assocFromFieldDef.type === 'select' && assocFromFieldDef.options) {
                const amountApproved: number = this.formGroup.controls['amountApproved'].value;
                const advanceFee: number = this.formGroup.controls['advanceFee'].value;
                let advanceFeeDiscount: number = 0;
                const index: number = assocFromFieldDef.options.findIndex((o: PromoCodeDto) => o.code === assocFromFieldValue);
                if(index !== -1) {
                  const pc: PromoCodeDto = assocFromFieldDef.options[index];
                  advanceFeeDiscount = this.doFeeDiscountCalc(pc, advanceFee);
                }
                this.promoCodeCalculation(advanceFeeDiscount, amountApproved, advanceFee);
              }
            }
          }
        }
      }
  }

  private getValuesForPromoCodeCalc(pc: PromoCodeDto) {
    const amountApproved: number = this.formGroup.controls['amountApproved'].value;
    const advanceFee: number = this.formGroup.controls['advanceFee'].value;
    const advanceFeeDiscount: number = this.doFeeDiscountCalc(pc, advanceFee);
    this.promoCodeCalculation(advanceFeeDiscount, amountApproved, advanceFee);
  }

  private doFeeDiscountCalc(pc: PromoCodeDto, advanceFee: number): number {
    let discount: number = 0;
    if(pc.valueType.toLowerCase() === 'percent' || pc.valueType === '%') {
      const percent: number = pc.value / 100;
      discount = advanceFee * percent;
    } else if(pc.valueType.toLowerCase() === 'fixed' || pc.valueType === '$') {
      discount = pc.value;
    }
    return discount;
  }

  private promoCodeCalculation(advanceFeeDiscount: number, amountApproved: number, advanceFee: number) {
    this.formGroup.controls['advanceFeeDiscount'].setValue(advanceFeeDiscount);
    const feeAfterDiscount: number = (advanceFee - advanceFeeDiscount);
    this.formGroup.controls['advanceFeeAfterDiscount'].setValue(feeAfterDiscount);
    this.formGroup.controls['amountToClient'].setValue(amountApproved);
    this.formGroup.controls['amountToCommAcc'].setValue(amountApproved + feeAfterDiscount);
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
