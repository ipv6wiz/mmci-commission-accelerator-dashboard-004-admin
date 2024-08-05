import { Brokerage } from '../entities/brokerage.interface';
import { CreditLimitItemEntity } from '../entities/credit-limit-item.entity';
import { AddressClass } from '../entities/address.class';
import { AgentPerformance } from '../entities/agent-performance.interface';

export interface ClientUpdateDto {
  uid: string;
  agentDreData?: any;
  approvedBy?: string;
  archivedBy?: string;
  brokerage: Brokerage;
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
  dreNumber?: string;
  dreState?: string;
  email?: string;
  emailVerified?: boolean;
  firstName?: string;
  homeAddress?: AddressClass;
  lastLogin?:string;
  lastName?: string;
  limit?: number;
  middleName?: string;
  performance?: AgentPerformance;
  photoURL?: string;
  roles?: string[];
  status?: string;
  updatedBy?: string;
}
