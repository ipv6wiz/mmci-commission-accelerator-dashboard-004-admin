export interface LedgerItemDto {
  uid: string; // generated UUID
  clientId: string;
  transactionDate: string; // ISO Format
  transType: string; // advance, escrow close, fee, to client, from client
  advanceId?: string;
  advanceName?: string;
  advanceAgreementNumber?: string;
  description?: string;
  amount: number; // $0.00
  creator?: string;
}
