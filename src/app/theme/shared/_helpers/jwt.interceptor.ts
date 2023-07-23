import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service';
import {UerLocalDto} from "../entities/uer-local.dto";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
    // add auth header with jwt if user is logged in and request is to the api url
    if( this.authService.isLoggedIn) {
        const user: UerLocalDto | null = this.authService.getLocalUserData();
        const isApiUrl = request.url.startsWith(environment.gcpCommAccApiUrl);
        console.log('JwtInterceptor - isApiUrl: ', isApiUrl);
        if(isApiUrl && user) {
            console.log('JwtInterceptor - adding Bearer ');
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.idToken}`
                }
            });
        }
    }
    return next.handle(request);
  }
}
