import {AdvanceEscrowDto} from "./advance-escrow.dto";
import { AddressDto } from './address.dto';

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
    escrowData?: AdvanceEscrowDto;
    estimatedClosingDate?: string; // ISO format date
    actualClosingDate?: string; // ISO format date
    remainingContingencies?: boolean;
    contingencyReleaseDate?: string; // ISO format date
}
