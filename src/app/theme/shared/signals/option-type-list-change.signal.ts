import { signal } from '@angular/core';
import { User } from '../entities/user.interface';
import { OptionsEntity } from '../entities/options.interface';

export const optionTypeListChangeSignal = signal({master: {} as OptionsEntity, masterId: '', update: false, user: {} as User })
