import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user.interface';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import {map, take} from "rxjs/operators";
import {AuthenticationService} from "./authentication.service";

@Injectable({ providedIn: 'root' })
export class UserService {
    private dbPath: string = '/users';
    usersRef: AngularFirestoreCollection<User>
  constructor( private afs: AngularFirestore) {
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
        let data: any[] = [];
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

    getOne(id: string): any {
        return this.usersRef.doc(id).ref.get()
            .then((doc) => {
                if (doc.exists) {
                    return doc.data();
                } else {
                    console.log(`Doc with id ${id} does not exist`);
                    return null;
                }
            })
            .catch((err) => {
                console.log(`Error retrieving Document with id ${id} and msg: ${err.message}`);
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
