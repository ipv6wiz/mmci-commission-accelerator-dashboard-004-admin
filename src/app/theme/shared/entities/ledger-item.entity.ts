import {AuditTrail} from "./audit-trail.class";

export class LedgerItemEntity extends AuditTrail {
    uid!: string;
    clientId!: string;
    transactionDate!: string; // IOS Format
    type!: string; // advance, escrow close, fee, to client, from client
    advanceId!: string;
    description!: string;
    amount!: number; // $0.00

    constructor() {
        super();
    }
}
