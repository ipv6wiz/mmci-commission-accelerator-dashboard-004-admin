import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
    console.log('>>>>>>>>>>>>> JwtInterceptor <<<<<<<<<<<<<<<<<<<<<<<')
    // add auth header with jwt if user is logged in and request is to the api url
    if( this.authService.isLoggedIn) {
        const uid: string | null = this.authService.getLocalUserDataProp('uid');
        const token: string = this.authService.getLocalUserDataProp('idToken');
        const isApiUrl = request.url.startsWith(environment.gcpCommAccApiUrl);
        console.log('JwtInterceptor - isApiUrl: ', isApiUrl);
        if(isApiUrl && !!uid) {
            console.log('Should be using Bearer & HTTP Only Cookie');
            request = request.clone({
                reportProgress: true,
                withCredentials: true,
                setHeaders: {
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'no-cache',
                    'x-csrf-token': uid
                }
            });
        }
    }
    return next.handle(request);
  }
}
