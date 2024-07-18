import { signal } from '@angular/core';

export const mmciFormSubmitSignal = signal({
  action: 'noop',
  dataType: '',
  formType: 'new',
  formData: {}
});
