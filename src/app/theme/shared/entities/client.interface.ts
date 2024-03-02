import {Address} from "./address.interface";
import {Brokerage} from "./brokerage.interface";
import {AgentPerformance} from "./agent-performance.interface";
import { CreditLimitItemEntity } from './credit-limit-item.entity';

export interface Client {
    uid: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dreNumber: string;
    dreState: string;
    dreLicenseExpirationDate: Date;
    cellPhone: string;
    homeAddress: Address;
    brokerage: Brokerage;
    performance: AgentPerformance;
    creditLimit: CreditLimitItemEntity;
    creditLimits: CreditLimitItemEntity[],
    dateApplied: Date;
    dateApproved: Date;
    approvedBy: string;
    dateUpdated: Date;
    updatedBy: string;
    dateArchived: Date;
    archivedBy: string;
    agentData: any;
    limit?: number;
}
