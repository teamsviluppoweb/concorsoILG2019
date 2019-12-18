import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return moment(value).locale('it-IT').format('d/MM/YYYY HH:mm');
  }

}
