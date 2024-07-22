import {  FormBuilder, FormGroup } from '@angular/forms';
import { FormFieldDto } from '../components/mmci-form-mat/dtos/form-field.dto';
import { HelpersService } from '../service/helpers.service';
import { AdvanceBankDto } from '../dtos/advance-bank.dto';

export class BankInfoClass {
  bankAccountName!: string; // name on account
  bankName!: string; // name of bank
  bankWireRoutingNumber!: string; // bank routing number for wires
  bankAccountNumber!: string; // bank account number

  protected bankFormGroup: FormGroup;
  protected fields: Map<string, FormFieldDto>;

  constructor(
    private fb: FormBuilder,
    private helpers: HelpersService,
    private dataObj: AdvanceBankDto = {} as AdvanceBankDto
  ) {
    console.log('BankInfoClass - constructor - dataObj: ', dataObj);
    this.populateProps(this.dataObj);
    this.fields = new Map<string, FormFieldDto>(this.populateFormFields().map((obj: FormFieldDto) => [obj.fcn, obj]));
    console.log('BankInfoClass - constructor - this: ', this);
    const controls = this.helpers.createControls(this.fields, this, 'object');
    this.bankFormGroup = this.fb.group(controls);
  }

  getFormGroup(): FormGroup {
    return this.bankFormGroup;
  }

  getFormFields(): Map<string, FormFieldDto> {
    return this.fields;
  }

  populateProps(bankObj: AdvanceBankDto) {
    const objKeys = Object.keys(bankObj);
    if(objKeys.length > 0){
      objKeys.forEach((objKey: string ) => {
        if(objKey) {
          const key = objKey as keyof AdvanceBankDto;
          this[key] = <string>bankObj[objKey as keyof typeof bankObj];
        }
      });
    }
  }

  populateFormFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];
    fields.push({
      fieldLabel: 'Bank Name',
      placeholder: 'Name of your Bank',
      fcn: 'bankName',
      type: 'text',
      autoCapitalize: 'words',
      required: true,
      disabled: false,
      validators: [],
      width: 100,
      rowCol: '01.1'
    });

    fields.push({
      fieldLabel: 'Account Name',
      placeholder: 'Name on Account',
      fcn: 'bankAccountName',
      type: 'text',
      autoCapitalize: 'words',
      required: true,
      disabled: false,
      validators: [],
      width: 100,
      rowCol: '01.2'
    });

    fields.push({
      fieldLabel: 'Wire Routing Number',
      placeholder: 'Routing number for Wire Transfers',
      fcn: 'bankWireRoutingNumber',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 100,
      rowCol: '02.1'
    });

    fields.push({
      fieldLabel: 'Bank Account Number',
      placeholder: 'Account Number',
      fcn: 'bankAccountNumber',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 100,
      rowCol: '02.2'
    });
    return fields;
  }
}
