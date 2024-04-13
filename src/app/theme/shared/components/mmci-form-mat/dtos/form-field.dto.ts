import { AddressClass } from '../../../entities/address.class';
import { AdvanceEscrowDetailsClass } from '../../../entities/advance-escrow-details.class';

export interface FormFieldDto {
  fieldLabel: string;
  placeholder: string;
  fcn: string;
  type: string;
  required: boolean;
  disabled: boolean;
  validators: any[];
  width: number; // percentage
  rowCol: string;
  default?: any;
  hide?: boolean
  autoCapitalize?: string;
  mask?: string;
  addrObj?: AddressClass;
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
