import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'nestedCol'
})

export class NestedColumnPipe implements PipeTransform {
  transform(item: any, col: string): any {
    const colParts = col.split('.');
    return item[colParts[0]][colParts[1]]
  }
}
