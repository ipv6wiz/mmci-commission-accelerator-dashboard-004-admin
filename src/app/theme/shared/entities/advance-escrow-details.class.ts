import { FormFieldDto } from '../components/mmci-form-mat/dtos/form-field.dto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HelpersService } from '../service/helpers.service';
import { AdvanceEscrowDto } from '../dtos/advance-escrow.dto';
import { EscrowCompanyDto } from '../dtos/escrow-company.dto';


export class AdvanceEscrowDetailsClass {
  escrowCompany!: string;
  escrowOfficer!: string;
  escrowPhone!: string;
  escrowEmail!: string;
  escrowTransactionNumber!: string;
  estimatedClosingDate!: string; // ISO format date
  actualClosingDate!: string; // ISO format date

  protected formGroup: FormGroup;
  protected fields: Map<string, FormFieldDto>;

  constructor(
    private fb: FormBuilder,
    private helpers: HelpersService,
    private dataObj: AdvanceEscrowDto = {} as AdvanceEscrowDto,
    private escrowCompanies: EscrowCompanyDto[]
  ) {
    this.populateProps(dataObj);
    this.fields = new Map<string, FormFieldDto>(this.populateFormFields().map((obj: FormFieldDto) => [obj.fcn, obj]));
    const controls = helpers.createControls(this.fields, this, 'object');
    this.formGroup = this.fb.group(controls);
  }

  populateFormFields(): FormFieldDto[] {
    const fields: FormFieldDto[] = [];
      // fields.push({
      //     fieldLabel: '',
      //     placeholder: '',
      //     fcn: '',
      //     type: '',
      //     required: true,
      //     disabled: false,
      //     validators: [],
      //     width: 0, // percentage
      //     rowCol: '',
      //     default: null,
      //     autoCapitalize: '',
      //     mask: '',
      //     addrObj: undefined,
      //     escrowObj: undefined,
      //     pickerId: '',
      //     startView: 'month',
      //     storedFormat: '',
      //     options: []
      // });

    fields.push({
      fieldLabel: 'Escrow Company',
      placeholder: 'Escrow Company',
      fcn: 'escrowCompany',
      type: 'select',
      required: true,
      disabled: false,
      validators: [],
      width: 50, // percentage
      rowCol: '1.1',
      options: this.escrowCompanies
    });

    fields.push({
      fieldLabel: 'Officer',
      placeholder: 'Escrow Officer',
      fcn: 'escrowOfficer',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 50, // percentage
      rowCol: '1.2',
      autoCapitalize: 'words',
    });

    fields.push({
      fieldLabel: 'Officer Phone',
      placeholder: 'Cell Phone number',
      fcn: 'escrowPhone',
      type: 'text',
      required: true,
      disabled: false,
      validators: [['pattern', '^[0-9]*$']],
      width: 33, // percentage
      rowCol: '2.1',
    });

    fields.push({
      fieldLabel: 'Officer Email',
      placeholder: 'Email address for Officer',
      fcn: 'escrowEmail',
      type: 'text',
      required: true,
      disabled: false,
      validators: [['email']],
      width: 33, // percentage
      rowCol: '2.2',
    });

    fields.push({
      fieldLabel: 'Transaction Number',
      placeholder: 'Escrow Transaction Number',
      fcn: 'escrowTransactionNumber',
      type: 'text',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '2.3',
    });

    fields.push({
      fieldLabel: 'Estimated Closing Date',
      placeholder: 'Estimated Closing Date',
      fcn: 'estimatedClosingDate',
      type: 'date',
      required: true,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '3.1',
      pickerId: 'escrow-est-closing',
      startView: 'month',
      storedFormat: 'ISO Local',
    });

    fields.push({
      fieldLabel: 'Actual Closing Date',
      placeholder: 'Actual Closing Date',
      fcn: 'actualClosingDate',
      type: 'date',
      required: false,
      disabled: false,
      validators: [],
      width: 33, // percentage
      rowCol: '3.2',
      pickerId: 'escrow-actual-closing',
      startView: 'month',
      storedFormat: 'ISO Local',
    });
    return fields;
  }

  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  getFormFields(): Map<string, FormFieldDto> {
    return this.fields;
  }

  populateProps(dataObj: AdvanceEscrowDto) {
    const objKeys = Object.keys(dataObj);
    console.log('populateProps - dataObj: ', dataObj);
    console.log('populateProps - objKeys: ', objKeys);
    if(objKeys.length > 0){
      objKeys.forEach((objKey: string ) => {
        if(objKey) {
          const key = objKey as keyof AdvanceEscrowDto;
          this[key] = <string>dataObj[objKey as keyof typeof dataObj];
        }
      });
    }
  }
}
