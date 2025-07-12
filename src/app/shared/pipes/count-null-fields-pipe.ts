import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countNullFields'
})
export class CountNullFieldsPipe implements PipeTransform {

  transform(obj: any): number {
    if (!obj || typeof obj !== 'object') return 0;

    return Object.values(obj).filter(value => value === null).length;
  }

}
