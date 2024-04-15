import {AuditTrail} from "./audit-trail.class";
import {Address} from "./address.interface";

export class AdvanceEntity extends AuditTrail {
    uid!: string;
    clientId!: string;
    name!: string; // when empty replaced by 1st line of address
    mlsId!: string; // mls id for property
    mlsSystem!: string;
    propertyAddress!: Address;
    amountRequested!: number; // whole $$
    dateRequested!: string; // ISO format date
    amountApproved?: number; // whole $$
    agentCommission!: number; // whole $$
    grossCommission!: number; // whole $$
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

    constructor() {
        super();
    }

}
