import {AuditTrail} from "./audit-trail.class";
import {LedgerItemEntity} from "./ledger-item.entity";

export class LedgerEntity extends AuditTrail {
    clientId: string
    ledgerItems!: LedgerItemEntity[];
    creditLimit: number;
    balance: number;

    constructor(clientId: string, creditLimit: number, items: LedgerItemEntity[] = []) {
        super();
        this.clientId = clientId;
        this.creditLimit = creditLimit;
        this.ledgerItems = items;
        this.balance = this.calcBalance();
    }

    calcBalance(): number{
        return this.ledgerItems.reduce((acc, item) => acc + item.amount, 0);
    }

    calcAvailableCredit(): number {
        return this.creditLimit - this.getBalance(true);
    }

    getBalance(reCalc: boolean = false): number {
        if(reCalc) {
            this.calcBalance();
        }
        return this.balance;
    }

    setCreditLimit(newLimit: number): number {
        this.creditLimit = newLimit;
        return this.calcAvailableCredit();
    }

    getCreditLimit(): number {
        return this.creditLimit;
    }

    postTransaction(item: LedgerItemEntity): number {
        item.amount = this.checkAmountSign(item.type, item.amount);
        this.ledgerItems.push(item);
        return this.getBalance(true);
    }

    checkAmountSign(type: string, amount: number): number {
        const absNumber = Math.abs(amount);
        let result: number = 0;
        switch(type.toLowerCase()){
            case 'advance':
            case 'fee':
            case 'to client':
            case 'neg adjust':
                result = 0 - absNumber;
                break;
            case 'escrow close':
            case 'from client':
            case 'pos adjust':
                result = absNumber;
                break;
        }
        return result;
    }

}
