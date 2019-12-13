import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'customDate'
})
export class SendingApfPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case false: return 'INVIA';
      case true: return '<mat-spinner></mat-spinner>';
    }
  }

}
