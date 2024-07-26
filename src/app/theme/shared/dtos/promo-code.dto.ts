export interface PromoCodeDto {
  code: string;
  validFrom: string;
  validTo: string;
  value: number;
  valueType: string; // fixed $ or percent %
}
