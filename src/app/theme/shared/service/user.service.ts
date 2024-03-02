import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user.interface';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {map, take} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {ApiResponse} from "../dtos/api-response.dto";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = environment.gcpCommAccApiUrl;
    private dbPath: string = '/users';
    usersRef: AngularFirestoreCollection<User>;
    fakeApiUrl: string = environment.fakeApiUrl;
    fireUserRecord: any;
  constructor(
      private afs: AngularFirestore,
      private http: HttpClient
  ) {
      this.usersRef = afs.collection(this.dbPath);
  }

    async getAllForEdit(options:any = {}) {
        let opStr: WhereFilterOp = '==';
        let opVal = 1;
        console.log('getAllForEdit - options: ', JSON.stringify(options));
        const userData = options.userData;
        if(userData.userStatusFilter) {
            switch (userData.userStatusFilter) {
                case 'active':
                    opStr = '==';
                    opVal = 1;
                    break;
                case "pending":
                    opStr = '>=';
                    opVal = 0;
                    break;
                case 'archived':
                    opStr = '==';
                    opVal = -1;
                    break;
                case 'deleted':
                    opStr = '==';
                    opVal = -2;
                    break;
                case 'all':
                    opStr = '>';
                    opVal = -99;
            }
        }

        const res = await this.usersRef.ref
            .where('status', opStr, opVal).get();
        const data: any[] = [];
        res.docs.forEach(doc => {
            console.log('User Doc: ', doc);
            return data.push({id: doc.id, ...doc.data()});
        });
        return data;
    }

  getAll() {
      console.log('getAll called');
      return this.usersRef.snapshotChanges().pipe(
          take(1),
          map(changes =>
              changes.map(c => {
                  console.log('getAll - doc ID: ', c.payload.doc.id);
                  console.log('getAll - doc data: ', c.payload.doc.data());
                      return ({id: c.payload.doc.id, ...c.payload.doc.data()});
                  }
              )
          )
      );
  }

  getUserName(userId: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}users/user/${userId}/name`);
  }


    getOne(userId: string): any {
        return this.usersRef.doc(userId).ref.get()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data();
                } else {
                    console.log(`Doc with id ${userId} does not exist`);
                    return null;
                }
            })
            .catch((err) => {
                console.log(`Error retrieving Document with id ${userId} and msg: ${err.message}`);
            });
    }

    createFireUser(values: any) {
        this.http.post(`${this.fakeApiUrl}users`, values).subscribe({
            next: (response: any) => {
                this.fireUserRecord = response.data.fireUserRecord;
            },
            error: (err) => {
              console.log('Error message: ', err.message)
            }
        });
    }

    create(user: User): any {
        return this.usersRef.doc(user.uid).set(user, {merge: true});
        // return this.usersRef.add({...user});
    }
    update(id: string, data: any): Promise<void> {
        console.log('userService - update - data: ', data);
        return this.usersRef.doc(id).set(data, {merge: true});
    }

    /**
     * @TODO: Soft delete in Comm-Acc to keep history
     * @TODO: Delete from Firebase User List to prevent login
     * @param id
     */
    delete(id: string): Promise<void> {
        return this.usersRef.doc(id).delete();
    }
}
