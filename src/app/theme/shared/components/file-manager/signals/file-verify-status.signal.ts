import { signal, WritableSignal } from '@angular/core';
import { FileVerifyStatusDto } from '../dtos/file-verify-status.dto';


export const fileVerifyStatusSignal: WritableSignal<FileVerifyStatusDto> = signal({action: 'none'} as FileVerifyStatusDto);
