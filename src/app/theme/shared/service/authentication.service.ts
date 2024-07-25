import {Inject, Injectable, LOCALE_ID} from '@angular/core';

import { Router } from '@angular/router';

import { User } from '../entities/user.interface';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import * as auth from 'firebase/auth';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from './users.service';
import { HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { DOCUMENT } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // private userSubject: BehaviorSubject<User | null>;
  // public user: Observable<User | null>;
  userData: any;
  returnUrl = '';

  constructor(
      private router: Router,
      public afAuth: AngularFireAuth,
      public userService: UsersService,
      @Inject(LOCALE_ID) public locale: string,
      @Inject(DOCUMENT) private document: any,
      private modal: MatDialog
  ) {
    // eslint-disable-next-line
    // this.userSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('user')!));
    // this.user = this.userSubject.asObservable();
  }

  // public get userValue() {
  //   return this.userSubject.value;
  // }

  getLocalUser(): User {
    return JSON.parse(sessionStorage.getItem('user')!);
  }

    /**
     * Call this from the add user of the User DG
     * Users can only be created by certain roles
     * NO self signup
     * @param values
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUpNewUser(values: any) {
      // const {email, password, firstName, lastName, roles} = values;

      // return this.afAuth
      //     .createUserWithEmailAndPassword(email, password)
      //     .then((result) => {
      //         /* Call the SendVerificaitonMail() function when new user sign
      //         up and returns promise */
      //         this.SetUserData(result.user, {firstName, lastName, roles})
      //             .then(() => {
      //                 this.SendVerificationMail()
      //                     .then(() => {
      //                         this.router.navigate(['auth/verify-email-address']);
      //                     });
      //             });
      //     })
      //     .catch((error) => {
      //         console.log('Caught signUp Error');
      //         throw new Error(error.message);
      //     });
  }

    // Send email verification when new user signs up
    SendVerificationMail() {
        return this.afAuth.currentUser
            .then((u: any) => {
                console.log('SendVerificationMail - u: ', u);
                return u.sendEmailVerification()
            });
    }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail: string) {
        return this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            })
            .catch((error) => {
                console.log('Caught ForgotPassword Error');
                throw new Error(error.message);
            });
    }

  addAuthHeaders(request: HttpRequest<string> | Request): any {
    if( this.isLoggedIn) {
      const uid: string | null = this.getLocalUserDataProp('uid');
      const token: string = this.getLocalUserDataProp('accessToken');
      const isApiUrl = request.url.startsWith(environment.gcpCommAccApiUrl);
      console.log(`addAuthHeaders - isApiUrl: ${isApiUrl} URL: ${request.url} token: ${token}`);
      const domain: string = this.document.location.hostname;

      const port: string = this.document.location.port;
      console.log(`addAuthHeaders - domain: ${domain}:${port}`);
      if (isApiUrl && !!uid) {
        if( request instanceof HttpRequest) {
          console.log('addAuthHeaders - HttpRequest');
          request = request.clone({
            reportProgress: true,
            withCredentials: true,
            setHeaders: {
              'Authorization': `Bearer ${token}`,
              'Cache-Control': 'no-cache',
              'x-csrf-token': uid
            }
          });
          return request;
        } else {
          console.log('addAuthHeaders - Fetch Request');
          console.log('addAuthHeaders - Fetch Request - oldRequest: ', request);
          // const headersObj: Headers = new Headers(
          //   [
          //     ['Authorization', `Bearer ${token}`],
          //     ['Cache-Control', 'no-cache'],
          //     ['x-csrf-token', uid]
          //   ]
          // );
          // headersObj.set('Authorization', `Bearer ${token}`);
          // headersObj.set('Cache-Control', 'no-cache');
          // headersObj.set('x-csrf-token', uid);
          // headersObj.forEach((value, key) => {
          //   console.log(`addAuthHeaders - Fetch Request - headersObj: key: ${key} - value: ${value}`);
          // });

          const requestUrl: string = request.url;
          const requestMethod: string = request.method;
          const  newRequest: Request = new Request(requestUrl, {
            referrerPolicy: 'origin',
            method: requestMethod,
            headers: new Headers(
              [
                ['Authorization', `Bearer ${token}`],
                ['Cache-Control', 'no-cache'],
                ['x-csrf-token', uid]
              ]
            ),
            credentials: 'include'
          });
          // console.log('addAuthHeaders - Fetch Request - newRequest - authHeader: ', newRequest.headers.get('Authorization'));
          const replaceRequest: Request = newRequest.clone();
          replaceRequest.headers.forEach((value, key) => {
            console.log(`addAuthHeaders - Fetch Request - replaceRequest - headersObj: key: ${key} - value: ${value}`);
          })

          console.log('addAuthHeaders - Fetch Request - replaceRequest: ', replaceRequest);
          return replaceRequest;
        }
      }
    } else {
      return request;
    }

  }

  async login(email: string, password: string, returnUrl: string) {
      return this.afAuth
          .signInWithEmailAndPassword(email, password)
          .then(async (result) => {
              console.log('login - user result: ', result);
              const user = result.user;
              if (!user) {
                  throw new Error('Invalid User');
              } else {
                  if (!user.emailVerified) {
                      throw new Error('Please verify your email address, check the email account you used for signup');
                  } else {
                    return this.SetUserData(user)
                        .then(() => {
                            this.getCurrentUserDocument()
                                .then((doc) => {
                                    const {defaultPage} = doc;
                                    console.log('You have been successfully logged in!: ', this.isLoggedIn);
                                    console.log('login - userData:', this.userData);
                                    sessionStorage.setItem('user', JSON.stringify(this.userData));
                                    console.log('login - returnUrl: ', returnUrl);
                                    console.log('login - defaultPage: ', defaultPage);
                                    if (!returnUrl) {
                                        returnUrl = defaultPage || '/dashboard/analytics';
                                    }
                                    return this.router.navigate([defaultPage]);
                                })
                                .catch((err) => {
                                    throw new Error(err.message);
                                });

                        })

                      // this.router.navigateByUrl(userDoc.defaultPage).then(r => );
                  }
              }
          })

          .catch((error) => {
              console.log('Caught Login Error');
              throw new Error(error.message + ' Contact the Administrator and be approved first');
          });
  }

  logout() {
    console.log('logout - openDialogs: ',this.modal.openDialogs);
    this.modal.openDialogs.forEach((modal)=> modal.close());
      this.afAuth.signOut()
          .then(() => {
              console.log('Logout');
              sessionStorage.removeItem('user');
              // console.log('Logout - userdata: ', JSON.stringify(this.getUserData()));
              // this.userSubject.unsubscribe();
              return this.router.navigate(['/auth/signin-v2']);
          })
          .catch((err) => {
              throw new Error(`Logout - ${err.message}`);
          })
    // remove user from local storage to log user out

  }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
      const localUser: string | null = sessionStorage.getItem('user');
      // console.log('isLoggedIn - localUser: ', localUser);
      if(localUser === 'undefined' || localUser === null) {
        // console.log('isLoggedIn - NOT logged In');
        return false;
      } else {
        // console.log('isLoggedIn - should not be here is localUser undefined or null');
        const user = JSON.parse(localUser!);
        // console.log(`isLoggedIn - user: ${JSON.stringify(user)}`);
        return user !== null && user.emailVerified !== false;
      }

    }

    /**
     * @TODO:  Need to get the record to set the defaultPage
     * @constructor
     */
    async GoogleAuth() {
        const provider = new auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        console.log('>>>>>>>>>> GoogleAuth <<<<<<<<<<');
        return await this.AuthLogin(provider);
        // console.log('GoogleAuth - result: ', result);
        // await this.router.navigate(['dashboard/analytics']);
    }

    /* Setting up user data when sign in with username/password,
   sign up with username/password and sign in with social auth
   provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    async SetUserData(user: any, data: any = {}) {
        const {firstName, lastName, roles} = data;
        let userDoc: User | null;
        console.log('>>>>>>> SetUserData - user: ', user);
        const idToken = await user.getIdToken();
        const accessToken = user.auth.currentUser.accessToken;
        console.log(`>>>>>>> SetUserData - idToken: ${idToken} - access token: ${accessToken}`);
        this.userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          idToken: idToken || '',
          accessToken: accessToken || '',
          lastLogin: new Date(parseInt(user.metadata.lastLoginAt)).toString(),
          userRecord: user
        };
        sessionStorage.setItem('user', JSON.stringify(this.userData));
        try {
           userDoc = await this.userService.getOneItem(user.uid);
        } catch (err: any) {
          userDoc = null;
        }
        // console.log('SetClientData - idToken: ', idToken);

        if(userDoc === null ) {
            console.log('New User');
            this.userData.status = 'User Pending Approval';
            this.userData.defaultPage = '/auth/pending-approval/';
            this.userData.firstName = firstName;
            this.userData.lastName = lastName;
            this.setLocalUserData(this.userData);
            this.userData.roles = roles || [];
            this.userData.roles.push('USER-PENDING-APPROVAL');
            return this.userService.createItem(this.userData);
        } else {
            // console.log('SetUserData - userDoc: ', userDoc);
            this.userData.firstName = userDoc.firstName || '';
            this.userData.lastName = userDoc.lastName || '';
            this.userData.displayName = userDoc.displayName || `${userDoc.firstName} ${userDoc.lastName}`;
            this.userData.roles = userDoc.roles;
            sessionStorage.setItem('user', JSON.stringify(this.userData));
            return this.userService.updateItem(this.userData.uid, this.userData);
        }
    }

    getLocalUserData() {
        const data = sessionStorage.getItem('user');
        if(data) {
            return JSON.parse(data);
        } else {
            return null;
        }
    }

    getLocalUserDataProp(prop: string): any {
        const data = this.getLocalUserData();
        if(data) {
            if(data[prop]) {
                return data[prop];
            }
        }
        return null;
    }

    setLocalUserData(data: any) {
        sessionStorage.setItem('user', JSON.stringify(data));
    }

    setLocalUserDataProp(prop: string, value: any) {
        const data = this.getLocalUserData();
        data[prop] = value;
        this.setLocalUserData(data);
    }

    async getCurrentUserDocument() {
        const userData = this.getLocalUserData();
        const uid = userData.uid;
        const userDoc = await this.userService.getOneItem(uid);
        // console.log('---> getCurrentUserDocument - userDoc: ', userDoc);
        return userDoc;
    }

    async getCurrentUserRoles(): Promise<string[]> {
        const userDoc = await this.getCurrentUserDocument();
        if(userDoc) {
          // console.log('AuthenticationService - getCurrentUserRoles - roles: ', userDoc.roles);
            return userDoc.roles || ['Guest'];
        } else  {
            return ['guest'];
        }
    }

    // Auth logic to run auth providers
    AuthLogin(provider: any) {
        return this.afAuth
            .signInWithPopup(provider)
            .then((result) => {
              console.log('AuthLogin - result.user: ', result.user);
                this.SetUserData(result.user)
                    .then(() => {
                        console.log(`AuthLogin - SetUserData - res: ${result.user}`);
                        this.getCurrentUserDocument()
                            .then((doc) => {
                                const {defaultPage} = doc;
                                console.log('You have been successfully logged in!: ', this.isLoggedIn);
                                this.router.navigate([defaultPage]);
                            })
                            .catch((err) => {
                                throw new Error(err.message);
                            })
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
