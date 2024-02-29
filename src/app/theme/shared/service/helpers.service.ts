import { Injectable } from '@angular/core';

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
}
