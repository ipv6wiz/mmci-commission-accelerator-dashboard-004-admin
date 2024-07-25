import { Injectable } from '@angular/core';
import {Router,  ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { AuthenticationService } from '../service';
import {JwtService} from "../service/jwt.service";
import {AlertService} from "../service/alert.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(
      private router: Router,
      private authService: AuthenticationService,
      private jwtService: JwtService,
      private alertService: AlertService
      ) {}

    // getRoutes(){
    //   const routes = this.router.config;
    //   console.log('AuthGuard - routes: ', routes);
    // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      // this.getRoutes();
      if (!this.authService.isLoggedIn) {
          this.router.navigate(['auth/signin-v2'], { queryParams: { returnUrl: state.url } });
          return false;
      } else {
          // console.log('Route Url: ', route.url);
          // console.log('Route Data Roles: ',route.data['roles']);
          // get user from sessionStorage and check the token expiration
          // If expired navigate to signin
          const userData = this.authService.getLocalUserData();
          if(this.jwtService.isExpired(userData.idToken)) {
              console.log('----> Token Expired');
              this.alertService.error('Token Expired: Please Login');
              this.authService.logout();
              // this.router.navigate(['auth/signin-v2'], { queryParams: { returnUrl: state.url } });
              return false;
          } else {
              return this.authService.getCurrentUserRoles()
                  .then((roles) => {
                      // console.log('canActivate - User Roles: ', roles);
                      if (roles.indexOf('SuperAdmin') !== -1) {
                          return true;
                      } else {
                          const okRole = (route.data['roles']) ? route.data['roles'].some((r: string) => roles.includes(r)) : false;
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

}
