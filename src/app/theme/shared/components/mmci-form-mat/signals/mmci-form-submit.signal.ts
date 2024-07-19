import { signal } from '@angular/core';

export interface mmciFormSubmitObj {
  action: string;
  dataType: string;
  formType: string;
  formData: any;
  callingData?: any;
}

export const mmciFormSubmitSignal = signal(
  {
    action: 'noop',
    dataType: '',
    formType: 'new',
    formData: {}
  } as mmciFormSubmitObj
);
