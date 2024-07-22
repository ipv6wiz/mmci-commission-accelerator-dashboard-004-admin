import { FormBuilder, FormGroup } from '@angular/forms';
import { HelpersService } from '../service/helpers.service';
import { AddressDto } from '../dtos/address.dto';
import { FormFieldDto } from '../dtos/form-field.dto';

export class AddressClass {
  Address1!: string;
  Address2!: string;
  City!: string;
  State: string;
  Zip5!: string;
  Zip4!: string;


  protected addressFormGroup: FormGroup;
  protected fields: Map<string, FormFieldDto>;

  constructor(
    private fb: FormBuilder,
    private helpers: HelpersService,
    addrObj: AddressDto = {} as AddressDto
  ) {
    this.State = 'CA';
    console.log('constructor - addrObj: ', addrObj);
    this.populateProps(addrObj);
    // this.fields = this.populateAddressFormFields();
    this.fields = new Map<string, FormFieldDto>(this.populateFormFields().map((obj: FormFieldDto) => [obj.fcn, obj]));
    console.log('constructor - this: ', this);
    const controls = helpers.createControls(this.fields, this, 'object');
    this.addressFormGroup = this.fb.group(controls);
  }

  getFormGroup(): FormGroup {
    return this.addressFormGroup;
  }

  getFormFields(): Map<string, FormFieldDto> {
    return this.fields;
  }

  populateProps(addrObj: AddressDto) {
    const keys = Object.keys(addrObj);
    console.log('populateProps - addrObj: ', addrObj);
    console.log('populateProps - keys: ', keys);
    if(keys.length > 0){
      keys.forEach((key ) => {
        this[key as keyof typeof  addrObj] = addrObj[key as keyof typeof  addrObj];
      });
    }
  }

  populateFormFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];
    fields.push({
      fieldLabel: 'Address Line 1',
      placeholder: 'Street Address',
      fcn: 'Address1',
      type: 'text',
      autoCapitalize: 'words',
      required: true,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '01.1'
    });
    fields.push({
      fieldLabel: 'Address Line 2',
      placeholder: 'Optional - Address Line 2',
      fcn: 'Address2',
      autoCapitalize: 'words',
      type: 'text',
      required: false,
      disabled: false,
      validators: [],
      width: 50,
      rowCol: '01.2'
    });
    fields.push({
      fieldLabel: 'City',
      placeholder: 'City',
      fcn: 'City',
      autoCapitalize: 'words',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 33,
      rowCol: '02.1'
    });
    fields.push({
      fieldLabel: 'State',
      placeholder: 'State',
      fcn: 'State',
      type: 'text',
      required: true,
      disabled: true,
      default: 'CA',
      validators: [],
      width: 33,
      rowCol: '02.2'
    });
    fields.push({
      fieldLabel: 'Zip Code ',
      placeholder: '5 digit Zip code',
      fcn: 'Zip5',
      type: 'text',
      required: true,
      disabled: false,
      validators: [['pattern', "^[0-9]{5}?$"], ['minLength', 5], ['maxLength', 5]],
      width: 17,
      rowCol: '02.3'
    });
    fields.push({
      fieldLabel: 'Zip Code extension',
      placeholder: '4 digit Zip ',
      fcn: 'Zip4',
      type: 'text',
      required: false,
      disabled: false,
      validators: [['pattern', "^[0-9]{4}?$"], ['minLength', 4], ['maxLength', 4]],
      width: 16,
      rowCol: '02.4'
    });
    return fields;
  }
}
