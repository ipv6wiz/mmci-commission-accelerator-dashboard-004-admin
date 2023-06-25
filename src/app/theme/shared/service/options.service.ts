import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {arrayUnion, arrayRemove} from '@angular/fire/firestore'
import {map, take} from "rxjs/operators";
import {Options} from "../entities/options.interface";
import {OptionValues} from "../entities/option-values.interface";



@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private dbPath = '/options';
  optionsRef: AngularFirestoreCollection<Options>
  constructor(private afs: AngularFirestore,) {
    this.optionsRef = afs.collection(this.dbPath);
  }

  getAll() {
    console.log('getAll called');

      return this.optionsRef.snapshotChanges().pipe(
      take(1),
      map(changes =>
        changes.map(c =>
            // @ts-ignore
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }

  getOne(id: string): any {
    return this.optionsRef.doc(id).ref.get().then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log(`Doc with id ${id} does not exist`);
        return null;
      }
    })
      .catch((err) => {
        console.log(`Error retrieving Document with id ${id} and msg: ${err.message()}`);
        throw new Error('Invalid Option id');
      });
  }

  getOptionsByType(type: string) {
      console.log('getOptionsByType - called');
      let data: any = [];
      let docData: any;
      return this.optionsRef.ref.where('type', '==', type).get()
          .then((res) => {
              if(res.docs.length > 0) {
                  docData = res.docs[0].data();
                  data = docData.values;
                  console.log('Option Data: ', data);
                  return data;
              } else {
                  throw new Error('Not found');
              }
          })
          .catch((err) => {
                console.log('Option Type not found');
                throw new Error('Option Type not found');
          });
  }

  create(option: Options): any {
    option.values = [];
    return this.optionsRef.add({...option});
  }

  update(id: string, data: any): Promise<void> {
    return this.optionsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.optionsRef.doc(id).delete();
  }

  createValue(typeId: string, valueData: OptionValues): Promise<void> {
    const addArrayItem = {values: arrayUnion(valueData)};
    return this.update(typeId, addArrayItem);
  }

  valueUpdate(typeId: string, key: any, valueData: OptionValues): Promise<void> {
    return this.valueDelete(typeId, key).then(() => {
      const updateArrayItem = {values: arrayUnion(valueData)};
      return this.update(typeId, updateArrayItem);
    });
  }

  valueDelete(typeId: string, key: any) {
    const deleteArrayItem ={values: arrayRemove(key)};
    return this.update(typeId, deleteArrayItem);
  }

}
