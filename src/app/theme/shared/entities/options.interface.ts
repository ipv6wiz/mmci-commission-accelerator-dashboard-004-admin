import {OptionValues} from "./option-values.interface";

export interface Options {
  id: string;
  optionName: string;
  type: string;
  dataType: string;
  slug: string;
  values: OptionValues[];
}
