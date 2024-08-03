import { AddressClass } from '../../../entities/address.class';
import { AdvanceEscrowDetailsClass } from '../../../entities/advance-escrow-details.class';
import { BankInfoClass } from '../../../entities/bankInfo.class';

export interface FormFieldDto {
  type: string;
  rowCol: string;
  fcn: string;
  fieldLabel: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
  validators: any[];
  width: number;
  default?: any;
  readOnly?: boolean;
  hide?: boolean
  autoCapitalize?: string;
  mask?: string;
  addrObj?: AddressClass;
  bankObj?: BankInfoClass;
  escrowObj?: AdvanceEscrowDetailsClass;
  pickerId?: string;
  startView?: 'month' | 'year' | 'multi-year';
  storedFormat?: string;
  options?: any[];
  conditional?: boolean; // if true precede the field with a checkbox
  defaultCondition?: boolean; // render the field
  condFieldLabel?: string;
  condPlaceholder?: string;
  condFcn?: string;
  condRequired?: boolean;
  condWidth?: number;
  selectKeyField?: string;
  selectValueField?: string;
  associatedToField?: string;
  associatedFromField?: string;
  associatedFieldType?: string;
  calculated?: boolean;
  calculation?: any;
  injectValue?:any;
  linkedField?: string;
  linkedFieldSource?: string;
  linkedFieldSourceField?: string;
  fieldsetLegend?: string;
  fieldsetStartHtml?: string;
  fieldsetEndHtml?: string;
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
