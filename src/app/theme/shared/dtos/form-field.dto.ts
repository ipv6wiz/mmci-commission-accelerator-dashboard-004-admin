import { Address } from '../entities/address.class';

export interface FormFieldDto {
  fieldLabel: string;
  placeholder: string;
  fcn: string;
  type: string;
  required: boolean;
  disabled: boolean;
  validators: any[];
  autoCapitalize?: string;
  mask?: string;
  addrObj?: Address;
  pickerId?: string;
  startView?: 'month' | 'year' | 'multi-year';
  storedFormat?: string;
  options?: any[];
}
