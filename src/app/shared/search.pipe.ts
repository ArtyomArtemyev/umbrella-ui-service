import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'wfmFilter'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter((i) => {
      if (!isNaN(i[field])) {
        i[field] += '';
      }
      return i[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

}
