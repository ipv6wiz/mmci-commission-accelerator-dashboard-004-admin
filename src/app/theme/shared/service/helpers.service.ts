import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Address } from '../entities/address.class';
import { FormFieldDto } from '../dtos/form-field.dto';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

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

  checkRoles(allowed: string[], userRoles: string[]): boolean {
    return userRoles.some(value => allowed.includes(value));
  }

  createControls(fields: Map<string, any>, obj: any, objType: string = 'item'): {[p: string]: FormControl} {
    let controls: Map<string, any> = new Map<string, any>();
    if (obj && objType === 'item') {
      obj = obj.item;
    }
    console.log('createControls - obj:', obj);
    controls = this.processFields(fields, obj, controls);
    // return controls;
    return Object.fromEntries(controls.entries());
  }

  processFields(fields: Map<string, any>, obj: any, controls: Map<string, any>): Map<string, any> {
    console.log('processFields - obj: ', obj);
    fields.forEach((field: any) => {
      if(['address'].includes(field['type'])) {
        console.log('processFields - address - field.fcn: ', field.fcn);
        console.log('processFields - address - addrObj: ', field.addrObj);
        controls.set(field.fcn, field.addrObj.getFormGroup());
      } else {
        const control = new FormControl()
        const ctrl:any[] = [];
        const validators: any[] = [];
        const  valueObj: any = {};
        // console.log('createControls - value: ',obj[field.fcn as keyof typeof obj]);
        if(obj) {
          control.setValue(obj[field.fcn as keyof typeof obj])
          // valueObj['value'] = obj[field.fcn as keyof typeof obj];
        } else {
          control.setValue('');
        }
        if(field.disabled) {
          control.disable() ;
          // valueObj['disabled'] = true;
        }
        console.log('createControls - valueObj: ', valueObj);

        if(field.required) {
          validators.push(Validators.required);

        }
        if(field.validators &&  field.validators.length > 0) {
          field.validators.forEach((val: any) => {
            console.log('createControls - validators val: ', val);
            switch (val[0]) {
              case 'pattern':
                validators.push(Validators.pattern(val[1]));
                break;
              case 'minLength':
                validators.push(Validators.minLength(val[1]));
                break;
              case 'maxLength':
                validators.push(Validators.maxLength(val[1]))
            }
          });
        }
        console.log('createControls - validators: ', validators);
        // ctrl.push(valueObj);
        // ctrl.push(validators);
        control.setValidators(validators)
        controls.set(field.fcn, control);
      }
    });
    return controls;
  }
}
