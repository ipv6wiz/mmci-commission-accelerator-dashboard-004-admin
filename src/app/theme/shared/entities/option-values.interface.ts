export interface OptionValue {
  typeId: string;
  key: string;
  value: string;
  sortOrder: number;
  displayValue?: string;
  usage?: string[];
  description?: string;
  data?: string;
}
