import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user.interface';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map, take} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UserService {
    private dbPath: string = '/users';
    usersRef: AngularFirestoreCollection<User>
  constructor(private http: HttpClient, private afs: AngularFirestore) {
      this.usersRef = afs.collection(this.dbPath);
  }

  getAll() {
      console.log('getAll called');
      return this.usersRef.snapshotChanges().pipe(
          take(1),
          map(changes =>
              changes.map(c =>
                  ({ id: c.payload.doc.id, ...c.payload.doc.data() })
              )
          )
      );
  }

    getOne(id: string): any {
        return this.usersRef.doc(id).ref.get().then((doc) => {
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
        // return this.usersRef.doc(id).update(data);
        return this.usersRef.doc(id).set(data, {merge: true});
    }

    delete(id: string): Promise<void> {
        return this.usersRef.doc(id).delete();
    }
}
