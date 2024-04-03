import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../service';
import {NGXLogger} from "ngx-logger";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
      private authenticationService: AuthenticationService
      , private logger: NGXLogger) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
          catchError((err: HttpErrorResponse) => {
              this.logger.info('Error Interceptor triggered status: ' + err.statusText + ' msg: ' + err.message);
              // console.log(`Error Interceptor triggered status: ${err.status} msg: ${err.message} URL: ${err.url}`);
            if ([401, 403].includes(err.status)) {
              // console.log('ErrorInterceptor - catchError - status: ', err.status);
              // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
              // this.authenticationService['logout']();
              console.log('Error detected should logout - holding for debug')
            }

            // const error = err.error.message || err.statusText;
            const msg = `status: ${err.status} - statusText: ${err.statusText} - custom`

              return throwError(() => new Error(msg));

          })
      );
    }
}
