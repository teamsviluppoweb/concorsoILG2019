import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infoAzioneDomanda'
})
export class InfoAzioneDomandaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 0: return 'COMPILA DOMANDA';
      case 1: return 'MODIFICA DOMANDA';
    }
  }

}
