import { signal } from '@angular/core';
import { User } from '../entities/user.interface';
import { Options } from '../entities/options.interface';

export const optionTypeListChangeSignal = signal({master: {} as Options, masterId: '', update: false, user: {} as User })
