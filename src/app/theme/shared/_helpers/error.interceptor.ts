import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../service';
import {NGXLogger} from "ngx-logger";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
      private authenticationService: AuthenticationService
      , private logger: NGXLogger) {}

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {

      return next.handle(request).pipe(
      catchError((err) => {
          this.logger.log('Error Interceptor triggered');
        if ([401, 403].includes(err.status)) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.authenticationService['logout']();
        }

        const error = err.error.message || err.statusText;
        const msg = error + " - custom";
        return throwError(() => new Error(msg));
      })
    );
  }
}
