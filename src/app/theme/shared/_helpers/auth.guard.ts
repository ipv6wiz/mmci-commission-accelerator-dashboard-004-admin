import { Injectable } from '@angular/core';
import {Router,  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';

import { AuthenticationService } from '../service';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private router: Router, private authService: AuthenticationService) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if (this.authenticationService.isLoggedIn) {
  //     return true;
  //   }
  //
  //   // not logged in so redirect to login page with the return url
  //   this.router.navigate(['auth/signin-v2'], { queryParams: { returnUrl: state.url } });
  //   return false;
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (!this.authService.isLoggedIn) {
          this.router.navigate(['auth/signin-v2'], { queryParams: { returnUrl: state.url } });
          return false;
      } else {
          // console.log('Route Url: ', route.url);
          // console.log('Route Data Roles: ',route.data['roles']);
          return this.authService.getCurrentUserRoles()
              .then((roles) => {
                  // console.log('User Roles: ', roles);
                  if(roles.indexOf('SuperAdmin') !== -1) {
                      return true;
                  } else {
                      const okRole = (!!route.data['roles']) ? route.data['roles'].some((r: string) => roles.includes(r)) : false;
                      // console.log('okRole: ', okRole);
                      return okRole;
                  }
              })
              .catch((err) => {
                  throw new Error(err.message);
              });


      }

}

}
