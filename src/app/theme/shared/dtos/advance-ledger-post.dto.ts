export interface AdvanceLedgerPostDto {
  clientId: string;
  amountApproved: number;
  amountToClient: number;
  advanceFee: number;
  advanceFeeDiscount: number;
  advanceName: string;
  agreementNumber: string;
  promoCodeDetailsRaw: string;
  advanceId: string; // uid
  creator?: string;
}
