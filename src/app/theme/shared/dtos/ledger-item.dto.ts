export interface LedgerItemDto {
  uid: string;
  clientId: string;
  transactionDate: string; // IOS Format
  type: string; // advance, escrow close, fee, to client, from client
  advanceId: string;
  advanceName: string;
  description: string;
  amount: number; // $0.00
  balance: number; // updated on the fly
}
