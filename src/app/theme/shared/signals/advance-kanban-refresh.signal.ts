import { signal } from '@angular/core';

export interface AKRSInterface {
  refresh: boolean;
  dataType: string;
  dataId?: string;
}

export const advanceKanbanRefreshSignal = signal(
  {
    refresh: false,
    dataType: ''
  } as AKRSInterface
);
