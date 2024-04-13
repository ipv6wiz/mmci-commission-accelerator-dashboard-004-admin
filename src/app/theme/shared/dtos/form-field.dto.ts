import { AddressClass } from '../entities/address.class';

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
  autoCapitalize?: string;
  mask?: string;
  addrObj?: AddressClass;
  pickerId?: string;
  startView?: 'month' | 'year' | 'multi-year';
  storedFormat?: string;
  options?: any[];
}
