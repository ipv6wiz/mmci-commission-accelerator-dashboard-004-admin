import { signal } from '@angular/core';

export interface DGRSInterface {
  refresh: boolean;
  dataType: string;
  dataId?: string;
}

export const dataGridRefreshSignal = signal(
  {
    refresh: false,
    dataType: ''
  } as DGRSInterface
);
