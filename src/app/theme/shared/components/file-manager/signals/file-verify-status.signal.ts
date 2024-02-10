import { signal } from '@angular/core';
import { FileVerifyStatusDto } from '../dtos/file-verify-status.dto';

export const fileVerifyStatusSignal = signal({action: 'none'} as FileVerifyStatusDto);
