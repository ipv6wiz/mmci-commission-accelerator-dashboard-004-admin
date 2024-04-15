import {AdvanceEscrowDto} from "./advance-escrow.dto";
import { AddressDto } from './address.dto';

export interface AdvanceCreateDto {
    clientId: string;
    mlsId: string; // mls id for property
    mlsSystem: string;
    propertyAddress: AddressDto;
    amountRequested: number; // whole $$
    agentCommission: number; // whole $$
    grossCommission: number; // whole $$
    escrowData: AdvanceEscrowDto;
    estimatedClosingDate: string; // ISO format date
    actualClosingDate?: string; // ISO format date
    remainingContingencies: boolean;
    contingencyReleaseDate?: string; // ISO format date
}
