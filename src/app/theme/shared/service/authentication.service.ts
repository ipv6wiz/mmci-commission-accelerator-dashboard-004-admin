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
  apiUrl: string = environment.apiUrl;
  returnUrl = '';

  constructor(
      private router: Router,
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

    /**
     * Call this from the add user of the User DG
     * Users can only be created by certain roles
     * NO self signup
     * @param values
     */
  signUpNewUser(values: any) {
      const {email, password, firstName, lastName, roles} = values;

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
                                    localStorage.setItem('user', JSON.stringify(this.userData));
                                    console.log('login - returnUrl: ', returnUrl);
                                    console.log('login - defaultPage: ', defaultPage);
                                    if (!returnUrl) {
                                        returnUrl = defaultPage;
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

    /**
     * @TODO:  Need to get the record to set the defaultPage
     * @constructor
     */
    async GoogleAuth() {
        const provider = new auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        const result = await this.AuthLogin(provider);
        console.log('GoogleAuth - result: ', result);
        // await this.router.navigate(['dashboard/analytics']);
    }

    /* Setting up user data when sign in with username/password,
   sign up with username/password and sign in with social auth
   provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    async SetUserData(user: any, data: any = {}) {
        const {firstName, lastName, roles} = data;
        console.log('SetUserData - user: ', user);
        const userDoc = await this.userService.getOne(user.uid);
        const idToken = await user.getIdToken();
        const accessToken = user.auth.currentUser.accessToken;
        console.log('SetClientData - idToken: ', idToken);
        this.userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            idToken: idToken || '',
            accessToken: accessToken || '',
            lastLogin: new Date(parseInt(user.metadata.lastLoginAt)).toString(),
        };
        if(userDoc === null ) {
            console.log('New User');
            this.userData.status = 'pending';
            this.userData.defaultPage = '/dashboard/';
            this.userData.firstName = firstName;
            this.userData.lastName = lastName;
            this.setLocalUserData(this.userData);
            this.userData.roles = roles || [];
            this.userData.roles.push('PendingUser');
            return this.userService.create(this.userData);
        } else {
            console.log('SetUserData - userDoc: ', userDoc);
            this.userData.firstName = userDoc.firstName || '';
            this.userData.lastName = userDoc.lastName || '';
            this.userData.displayName = userDoc.displayName || `${userDoc.firstName} ${userDoc.lastName}`;
            localStorage.setItem('user', JSON.stringify(this.userData));
            return this.userService.update(this.userData.uid, this.userData)
        }
    }

    getLocalUserData() {
        const data = localStorage.getItem('user');
        if(!!data) {
            return JSON.parse(data);
        } else {
            return null;
        }
    }

    setLocalUserData(data: any) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    setLocalUserDataProp(prop: string, value: any) {
        const data = this.getLocalUserData();
        data[prop] = value;
        this.setLocalUserData(data);
    }

    async getCurrentUserDocument() {
        const userData = this.getLocalUserData();
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
