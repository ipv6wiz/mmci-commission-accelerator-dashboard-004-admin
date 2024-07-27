import {AuditTrail} from "./audit-trail.class";
import {Address} from "./address.interface";
import { BankInfo } from './bankInfo.interface';
import { PromoCodeEntity } from './promo-code.entity';
import { Client } from './client.interface';

export class AdvanceEntity extends AuditTrail {
    uid!: string;
    clientId!: string;
    currClient!: Client;
    advanceName!: string; // when empty replaced by 1st line of address
    mlsId!: string; // mls id for property
    mlsSystem!: string;
    propertyAddress!: Address;
    dateRequested!: string; // ISO format date

    amountRequested!: number; // whole $$
    amountApproved?: number; // whole $$
    advanceFee?: number;
    advanceFeeDiscount?: number;
    advanceFeeAfterDiscount?: number;
    amountToClient?: number;
    amountToCommAcc?: number;

    agentCommission!: number; // whole $$
    grossCommission!: number; // whole $$
    availableCredit?: number;

    escrowCompany!: string;
    escrowOfficer!: string;
    escrowPhone!: string;
    escrowEmail!: string;
    escrowTransactionNumber!: string;
    estimatedClosingDate!: string; // ISO format date
    actualClosingDate!: string; // ISO format date
    advanceStatus!: string; // pending, current, paid, rejected
    rejectedReason?: string;
    remainingContingencies!: boolean;
    contingencyReleaseDate?: string; // ISO format date
    promoCode?: string;
    promoCodeDetailsRaw?: string;
    promoCodeDetails?: PromoCodeEntity;
    promoCodeValid?: boolean;
    bankInfo!: BankInfo;
    agreementNumber?: string;

    constructor() {
        super();
    }

}
