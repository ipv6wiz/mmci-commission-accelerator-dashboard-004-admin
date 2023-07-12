import { Injectable } from '@angular/core';
import {JwtHelperService} from "angular-jwt-updated";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
    private helper: JwtHelperService;
  constructor() {
      this.helper = new JwtHelperService();
  }

    decodeToken(token: string) {
      return this.helper.decodeToken(token);
    }

    getExpirationDate(token: string) {
      return this.helper.getTokenExpirationDate(token);
    }

    isExpired(token: string) {
      return this.helper.isTokenExpired(token);
    }

}
