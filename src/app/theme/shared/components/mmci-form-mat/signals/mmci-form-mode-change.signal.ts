import { signal } from '@angular/core';

export interface mmciFormModeChangeObj {
  action: string;
  mode: string;
  formUUID?: string;
  dataTypeTag: string;
}

export const mmciFormModeChangeSignal = signal(
  {
    action: 'noop'
  } as mmciFormModeChangeObj
);
