import {AddressClass} from "../entities/address.class";
import {EscrowCompanyOfficerEntity} from "../entities/escrow-company-officer.entity";

export class EscrowCompanyDto {
    uid: string = '';
    companyName: string = '';
    companyPhone: string = '';
    companyAddress?: AddressClass;
    officers?: EscrowCompanyOfficerEntity[]
}
