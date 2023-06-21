import { TDrops, TOpens } from '../common/type/poistions.type';
import { ElementRef } from '@angular/core';

export interface IDatePickerDirectiveConfig {
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  onOpenDelay?: number;
  disableKeypress?: boolean;
  inputElementContainer?: HTMLElement | ElementRef;
  drops?: TDrops;
  opens?: TOpens;
  hideInputContainer?: boolean;
}
