import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConsoleToggleService {

  constructor() { }
    disableConsoleInProduction(): void {
        if (environment.production && environment.hideConsole) {
            console.warn(`🚨 Console output is disabled in production!`);
            console.log = function (): void { };
            console.debug = function (): void { };
            console.warn = function (): void { };
            console.info = function (): void { };
        }
    }
}
