import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone:true,
  name: 'isNegative'
})

export class IsNegativePipe implements PipeTransform {
  transform(value: any): boolean {
    if(!isNaN(parseInt(value, 10))) {
      return parseInt(value, 10) < 0;
    } else {
      return false;
    }
  }
}
