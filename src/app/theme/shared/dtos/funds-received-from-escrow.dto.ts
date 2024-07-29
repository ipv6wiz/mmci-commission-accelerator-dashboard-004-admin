export interface FundsReceivedFromEscrowDto {
  clientId: string;
  advanceId: string;
  amountReceivedFromEscrow: number;
  advanceName: string;
  agreementNumber: string;
  creator?: string;
}
