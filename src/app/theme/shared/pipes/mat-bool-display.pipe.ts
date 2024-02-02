import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'matBoolDisplay'
})

export class MatBoolDisplayPipe implements PipeTransform {
  transform(boolValue: any, usage: string = 'mat'): any {
    let localBool: boolean = false;
    if(typeof boolValue === 'string') {
      const dx: string = boolValue;
      if(dx.toLowerCase() === 'true' || dx.toLowerCase() === 'false') {
        localBool = dx.toLowerCase() === 'true';
      }
    } else if(typeof boolValue === 'boolean') {
      localBool = boolValue;
    }
    const trueValue = usage === 'bs' ? 'bi-check-circle-fill biBoolTrue' : 'check_circle';
    const falseValue = usage === 'bs' ? 'bi-x-circle-fill biBoolFalse' : 'close';
    return localBool ? trueValue :falseValue ;
  }
}

