import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SelectDto } from '../components/mmci-form-mat/dtos/select.dto';
import { FormFieldDto } from '../components/mmci-form-mat/dtos/form-field.dto';
import { v7 as uuid } from 'uuid';

import { ConfirmDialogDto } from '../dtos/confirm-dialog.dto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Address } from '../entities/address.interface';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  private boolWords: string[] = [];
  private trueWords: string[] = [ 'true','yes',];
  private falseWords: string[] = ['false','no'];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.boolWords = this.trueWords.concat(this.falseWords);
  }

  sequenceRowCol(fields: FormFieldDto[]): FormFieldDto[] {
    const f: FormFieldDto[] = [];
    let row: number = 1;
    let currRowNumber: number = -1;
    fields.forEach((field: FormFieldDto) => {
      const rowColParts: string[] = field.rowCol.split('.');
      if(currRowNumber === -1) {
        currRowNumber = parseInt( rowColParts[0], 10);
      }
      const fieldRowNumber = parseInt( rowColParts[0], 10);
      if(fieldRowNumber > currRowNumber  ) {
        row++;
        currRowNumber = fieldRowNumber;
      }
      rowColParts[0] = row.toString(10).padStart(2, '0');
      field.rowCol = rowColParts.join('.');
      f.push(field);
    });
    return f;
  }

  makeFullAddress(propAddress: Address, type: string = 'flat'): string {
    const addr: string[] = [];
    const joiner: string = type === 'flat' ? ', ' : '<br/>';
    addr.push(propAddress.Address1);
    if(propAddress.Address2 && propAddress.Address2.length > 0){
      addr.push(propAddress.Address2)
    }
    addr.push(propAddress.City);
    const zip4: string = propAddress.Zip4 ? '-'+propAddress.Zip4 : ''
    const stateZip: string = `${propAddress.State || 'CA'} ${propAddress.Zip5}${zip4}`;
    addr.push(stateZip);
    return addr.join(joiner);
  }

  openConfirmDialog(data: ConfirmDialogDto): MatDialogRef<any> {
    return this.dialog.open(ConfirmDialogComponent, {
      data
    });
  }

  openSnackBar(message: string, action: string = '', duration: number = 2000): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, { duration });
  }

  getUUID(): string {
    return uuid();
  }

  isColumnTypeBool(data: any): boolean {
    if(typeof data === 'string') {
      const dx: string = data;
      if(this.boolWords.includes(dx.toLowerCase())) {
        return true;
      }
    }
    return (typeof data === 'boolean');
  }

  convertBoolString(data: any): any {
    if(typeof data === 'string' && this.isColumnTypeBool(data)){
      if(this.trueWords.includes(data.toLowerCase())) {
        return true;
      } else if(this.falseWords.includes(data.toLowerCase())) {
        return false;
      }
    } else {
      return data;
    }
  }

  isColumnTypeBoolNested(item: any, column: string): boolean {
    const colParts = column.split('.');
    const data = item[colParts[0]][colParts[1]];
    return this.isColumnTypeBool(data);
  }

  convertToCamelCase(str: string, sep: string = '-'): string {
    const newStr = this.autoCapitalize(str, sep, '', true);
    console.log('convertToCameCase - newStr: ', newStr);
    return newStr;
  }

  autoCapitalize(text: string, sep: string = ' ', joiner: string = ' ', ignoreFirst: boolean = false): string {
    const words: string[] = text.split(sep);
    const startIndex = (ignoreFirst) ? 1 : 0;
    for(let w = startIndex; w < words.length; w++){
      words[w] = words[w].charAt(0).toUpperCase()+words[w].slice(1);
    }
    return words.join(joiner);
  }

  makeIsoDate(localDate: string, withTime: boolean = true): string {
    const dateParts = localDate.split('/'); // 0=month, 1=day, 2=year
    const isoParts: string[] = [];
    isoParts.push(dateParts[2]);
    isoParts.push(dateParts[0].padStart(2, '0'));
    isoParts.push(dateParts[1].padStart(2, '0'));
    return isoParts.join('-')+(withTime ? 'T00:00:00' : '');
  }

  dtoToObject(dto: any, obj: any): any {
    const dtoKeys = Object.keys(dto);
    dtoKeys.forEach((key: string) => {
      obj[key] = dto[key];
    });
    return obj;
  }

  mapToKvpArray(items: Map<string, any>): any[] {
    const itemsArray: any[] = [];
    if(items){
      items.forEach((value, key) => {
        const elem: SelectDto = {
          key,
          value
        }
        itemsArray.push(elem)
      })
    }
    return itemsArray;
  }

  mapToIterator(items: Map<string, any>): IterableIterator<any> {
    return items.values()
  }

  mapToArray(items: Map<string, any>): any[] {
    const arr: any[] = [];
    items.forEach((item: any) => {
      arr.push(item);
    });
    console.log('HelpersService - mapToArray arr: ', arr);
    return arr;
  }

  checkRoles(allowed: string[], userRoles: string[]): boolean {
    return userRoles.some(value => allowed.includes(value));
  }

  padRowCol(rowCol: string): string {
    const parts: string[] = rowCol.split('.');
    parts[0] = parts[0].padStart(2, '0');
    // console.log('helpers - padRowCol - padded: ', parts.join('.'));
    return parts.join('.');
  }

  populateRows(fieldsArr: FormFieldDto[]): any[] {

    for(let i = 0; i < fieldsArr.length; i++) {
      fieldsArr[i].rowCol = this.padRowCol(fieldsArr[i].rowCol); // ensure row number sorts correctly
    }
    // console.log('populateRows - fieldsArr: ', fieldsArr);
    const rows: any[] = [];
    fieldsArr.sort((a: FormFieldDto,b: FormFieldDto): number => {
      if(!a.rowCol || !b.rowCol) {
        return 0;
      }
      if(a.rowCol < b.rowCol) {
        return -1;
      } else if(a.rowCol > b.rowCol) {
        return 1;
      }
      return 0;
    })
    fieldsArr.forEach((field: FormFieldDto) => {
      console.log('HelpersService - populateRows - fieldsArr for each : field: ', field);
      let row: number = 0;
      let col: number = 0;
      if(field.rowCol) {
        const rowColParts = field.rowCol.split('.');
        row = parseInt(rowColParts[0], 10);
        col = parseInt(rowColParts[1], 10);
      } else {
        row++;
      }
      // const col: number = parseInt(rowColParts[1], 10);
      console.log(`helpers - populateRows - field: ${field.fcn} -  row: ${row} col: ${col} rows.length: ${rows.length}`);
      if(row === rows.length + 1) {
        // console.log('>>>>>>> populateRows - make a slot');
        rows.push([]);
      }
      rows[row - 1].push(field);
    });
    return rows;
  }

  createControls(fields: Map<string, any>, obj: any, objType: string = 'item'): {[p: string]: FormControl} {
    let controls: Map<string, any> = new Map<string, any>();
    if (obj && objType === 'item') {
      obj = obj.item;
    }
    // console.log('createControls - obj:', obj);
    controls = this.processFields(fields, obj, controls);
    // return controls;
    return Object.fromEntries(controls.entries());
  }

  processFields(fields: Map<string, any>, obj: any, controls: Map<string, any>): Map<string, any> {
    console.log('processFields - obj: ', obj);
    fields.forEach((field: any) => {
      if(['address', 'bank'].includes(field['type'])) {

        switch(field['type']) {
          case 'address':
            console.log('processFields - address - field.fcn: ', field.fcn);
            console.log('processFields - address - addrObj: ', field.addrObj);
            controls.set(field.fcn, field.addrObj.getFormGroup());
            break;
          case 'bank':
            console.log('processFields - bank - field.fcn: ', field.fcn);
            console.log('processFields - bank - bankObj: ', field.bankObj);
            controls.set(field.fcn, field.bankObj.getFormGroup());
            break;
        }
      } else {
        if(field.conditional) {
          const condControl: FormControl = new FormControl();
          if(obj) {
            condControl.setValue(obj[field.condFcn as keyof typeof obj]);
          } else {
            condControl.setValue(field.defaultCondition);
          }
          controls.set(field.condFcn, condControl);
        }
        const control: FormControl = new FormControl();
        const validators: any[] = [];
        // const  valueObj: any = {};
        // console.log('createControls - value: ',obj[field.fcn as keyof typeof obj]);
        if(obj) {
          control.setValue(obj[field.fcn as keyof typeof obj]);
          // valueObj['value'] = obj[field.fcn as keyof typeof obj];
        } else {
          control.setValue('');
        }
        if(field.disabled) {
          control.disable() ;
          // valueObj['disabled'] = true;
        }
        // console.log('createControls - valueObj: ', valueObj);
        if(field.type === 'select') {
          console.log('processFields - select');
        }
        if(field.required) {
          validators.push(Validators.required);
        }
        if(field.validators &&  field.validators.length > 0) {
          field.validators.forEach((val: any) => {
            // console.log('createControls - validators val: ', val);
            switch (val[0]) {
              case 'pattern':
                validators.push(Validators.pattern(val[1]));
                break;
              case 'minLength':
                validators.push(Validators.minLength(val[1]));
                break;
              case 'maxLength':
                validators.push(Validators.maxLength(val[1]));
                break;
              case 'email':
                validators.push(Validators.email);
                break;
            }
          });
        }
        // console.log('createControls - validators: ', validators);
        control.setValidators(validators)
        controls.set(field.fcn, control);
      }
    });
    return controls;
  }

  replacer(key: any, value: any) {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }

  reviver(key: any, value: any) {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }

}
