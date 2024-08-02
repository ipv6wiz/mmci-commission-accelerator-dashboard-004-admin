import { AddressDto } from './address.dto';

export interface CompanyInfoDto {
  companyName: string;
  companyAddress: AddressDto,
  bankName: string;
  bankAccountName: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
}
