import { signal } from '@angular/core';

export const clientVerifyStatusSignal = signal({statusMap:  new Map<string, boolean>(), overall: false, clientId: '' });
