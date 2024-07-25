import { AddressDto } from './address.dto';
import { AdvanceBankDto } from './advance-bank.dto';

export interface AdvanceUpdateDto {
    uid: string;
    clientId: string;
    mlsId?: string; // mls id for property
    mlsSystem?: string;
    propertyAddress?: AddressDto;
    amountRequested?: number; // whole $$
    amountApproved?: number; // whole $$
    agentCommission?: number; // whole $$
    grossCommission?: number; // whole $$
    escrowCompany?: string;
    escrowOfficer?: string;
    escrowPhone?: string;
    escrowEmail?: string;
    escrowTransactionNumber?: string;
    estimatedClosingDate?: string; // ISO format date
    actualClosingDate?: string; // ISO format date
    remainingContingencies?: boolean;
    contingencyReleaseDate?: string; // ISO format date
    bankInfo?: AdvanceBankDto;
    advanceStatus?: string;
    advanceName?: string;
    promoCode?: string;
}
