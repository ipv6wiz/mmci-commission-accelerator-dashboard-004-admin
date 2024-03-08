import { signal } from '@angular/core';
import { FileVerifyStatusDto } from '../components/file-manager/dtos/file-verify-status.dto';

export const fileVerifyStatusSignal = signal({action: 'none'} as FileVerifyStatusDto);
