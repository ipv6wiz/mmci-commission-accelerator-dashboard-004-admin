export interface LedgerItemDto {
  uid: string; // generated UUID
  clientId: string;
  transactionDate: string; // ISO Format
  transType: string; // advance, escrow close, fee, to client, from client
  advanceId?: string;
  advanceName?: string;
  description?: string;
  advanceAgreementNumber?: string;
  amount: number; // $0.00
  balance: number;
  creator?: string;
}
