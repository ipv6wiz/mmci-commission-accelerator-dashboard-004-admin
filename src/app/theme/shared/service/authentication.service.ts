import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../entities/user.interface';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "./user.service";
import * as auth from 'firebase/auth';
import {DatePipe} from "@angular/common";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  userData: any;

  constructor(
      private router: Router,
      private http: HttpClient,
      public afAuth: AngularFireAuth,
      public userService: UserService,
      @Inject(LOCALE_ID) public locale: string
  ) {
    // eslint-disable-next-line
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  signUp(email: string, password: string, agentData: any) {
      return this.afAuth
          .createUserWithEmailAndPassword(email, password)
          .then((result) => {
              /* Call the SendVerificaitonMail() function when new user sign
              up and returns promise */
              this.SetUserData(result.user)
                  .then(() => {
                      this.SendVerificationMail()
                          .then(() => {
                              this.router.navigate(['auth/verify-email-address']);
                          });
                  });
          })
          .catch((error) => {
              console.log('Caught signUp Error');
              throw new Error(error.message);
          });
  }

    // Send email verfificaiton when new user sign up
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

  login(email: string, password: string, returnUrl: string) {
      return this.afAuth
          .signInWithEmailAndPassword(email, password)
          .then((result) => {
              console.log('login - user result: ', result);
              return this.SetUserData(result.user)
                  .then(() => {
                      this.afAuth.authState.subscribe((user) => {
                          if (user) {
                              this.userData = user;
                              // @ts-ignore
                              this.userData['lastLoginDate'] = new Date(parseInt(user.metadata.lastLoginAt)).toString();
                              this.getCurrentUserDocument()
                                  .then((doc) => {
                                      const {defaultPage} = doc;
                                      console.log('You have been successfully logged in!: ', this.isLoggedIn);
                                      console.log('login - userData:', this.userData);
                                      localStorage.setItem('user', JSON.stringify(this.userData));
                                      console.log('login - returnUrl: ', returnUrl);
                                      console.log('login - defaultPage: ', defaultPage);
                                      if(!returnUrl) {
                                          returnUrl = defaultPage;
                                      }
                                      return this.router.navigate([defaultPage]);
                                  })
                                  .catch((err) => {
                                      throw new Error(err.message);
                                  });

                              // this.router.navigateByUrl(userDoc.defaultPage).then(r => );
                          } else {
                              // const timeStr = formatDate(Date.now(), 'H:mm:SSS', this.locale);
                              // throw new Error(timeStr + ' Login - Invalid User.');
                          }
                  });
              });
          })
          .catch((error) => {
              console.log('Caught Login Error');
              throw new Error(error.message + ' You must register and be approved first');
          });
  }

  logout() {
      this.afAuth.signOut()
          .then(() => {
              console.log('Logout');
              localStorage.removeItem('user');
              // console.log('Logout - userdata: ', JSON.stringify(this.getUserData()));
              this.userSubject.unsubscribe();
              return this.router.navigate(['/auth/signin-v2']);
          })
          .catch((err) => {
              throw new Error(`Logout - ${err.message}`);
          })
    // remove user from local storage to log user out

  }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        // console.log(`isLoggedIn - user: ${JSON.stringify(user)}`);
        return user !== null && user.emailVerified !== false;
    }

    // Sign in with Google
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
            console.log('GoogleAuth');
            this.router.navigate(['dashboard/analytics']);
        });
    }

    /* Setting up user data when sign in with username/password,
   sign up with username/password and sign in with social auth
   provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    async SetUserData(user: any) {
        console.log('SetUserData - user: ', user);
        const userDoc = await this.userService.getOne(user.uid);
        if(userDoc === null ) {
            console.log('User Not Found');
            throw new Error('User Not Found');
        } else {
            console.log('SetUserData - userDoc: ', userDoc);
            this.userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                lastLogin: new Date(parseInt(user.metadata.lastLoginAt)).toString(),
            };
            localStorage.setItem('user', JSON.stringify(this.userData));
            return this.userService.update(this.userData.uid, this.userData)
        }
    }

    getUserData() {
        const data = localStorage.getItem('user');
        if(!!data) {
            return JSON.parse(data);
        } else {
            return null;
        }
    }

    async getCurrentUserDocument() {
        const userData = this.getUserData();
        const uid = userData.uid;
        const userDoc = await this.userService.getOne(uid);
        return userDoc;
    }

    async getCurrentUserRoles(): Promise<string[]> {
        const userDoc = await this.getCurrentUserDocument();
        if(!!userDoc) {
            return userDoc.roles;
        } else  {
            return ['guest'];
        }
    }

    // Auth logic to run auth providers
    AuthLogin(provider: any) {
        return this.afAuth
            .signInWithPopup(provider)
            .then((result) => {
                this.SetUserData(result.user)
                    .then(() => {
                        const user = JSON.stringify(result.user);
                        localStorage.setItem('user', user);
                        // console.log(`AuthLogin - SetUserData - res: ${user}`);
                        const userDoc = this.getCurrentUserDocument()
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
