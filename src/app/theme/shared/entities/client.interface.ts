import {AddressClass} from "./address.class";
import {Brokerage} from "./brokerage.interface";
import {AgentPerformance} from "./agent-performance.interface";
import { CreditLimitItemEntity } from './credit-limit-item.entity';

export interface Client {
    uid: string;
    agentDreData?: any;
    approvedBy?: string;
    archivedBy?: string;
    brokerage?: Brokerage;
    bucket?: string;
    cellPhone?: string;
    clientDocs?: any;
    creditLimit?: CreditLimitItemEntity;
    creditLimits?: CreditLimitItemEntity[],
    dateApplied?: Date;
    dateApproved?: Date;
    dateArchived?: Date;
    dateUpdated?: Date;
    defaultPage?: string;
    displayName?: string;
    dreLicenseExpirationDate?: Date;
    dreNumber: string;
    dreState?: string;
    email?: string;
    emailVerified?: boolean;
    firstName?: string;
    homeAddress?: AddressClass;
    lastLogin?:string;
    lastName?: string;
    middleName?: string;
    performance?: AgentPerformance;
    photoURL?: string;
    roles?: string[];
    status?: string;
    updatedBy?: string;
}
