import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
    // add auth header with jwt if user is logged in and request is to the api url
    // const user = this.authenticationService['userValue'];
    // const isLoggedIn = user?.token;
    // console.log('Intercept - URL: ', request.url);
    // const isApiUrl = request.url.startsWith(environment.apiUrl);
    // if (isLoggedIn && isApiUrl) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${user.token}`
    //     }
    //   });
    // }

    return next.handle(request);
  }
}
