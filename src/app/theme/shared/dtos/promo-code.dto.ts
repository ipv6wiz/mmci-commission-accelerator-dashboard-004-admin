export interface PromoCodeDto {
  code: string;
  description: string;
  value: number;
  valueType: string; // fixed $ or percent %
  details: string;
  validFrom: string;
  validTo: string;
}
