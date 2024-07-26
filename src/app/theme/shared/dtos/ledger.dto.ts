import { LedgerItemDto } from './ledger-item.dto';

export interface LedgerDto {
  clientId: string
  ledgerItems: LedgerItemDto[];
  creditLimit: number;
  balance: number;
}
