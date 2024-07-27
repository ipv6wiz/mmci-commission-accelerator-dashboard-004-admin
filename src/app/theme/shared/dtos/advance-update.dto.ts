import { AddressDto } from './address.dto';
import { AdvanceBankDto } from './advance-bank.dto';
import { PromoCodeEntity } from '../entities/promo-code.entity';
import { Client } from '../entities/client.interface';

export interface AdvanceUpdateDto {
    uid: string;
    clientId: string;
    currClient?: Client;
    mlsId?: string; // mls id for property
    mlsSystem?: string;
    propertyAddress?: AddressDto;

    amountRequested?: number; // whole $$
    amountApproved?: number; // whole $$
    advanceFee?: number;
    advanceFeeAfterDiscount?: number;
    amountToClient?: number;
    amountToCommAcc?: number;
    agentCommission?: number; // whole $$
    grossCommission?: number; // whole $$
    availableCredit?: number;

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
    promoCodeDetailsRaw?: string;
    promoCodeDetails?: PromoCodeEntity;
}
