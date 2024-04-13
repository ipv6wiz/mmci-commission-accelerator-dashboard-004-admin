import { signal } from '@angular/core';

export const dashCardsRefreshSignal =
  signal({refresh: false, dataType: ''});
