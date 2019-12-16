import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statoDomanda'
})
export class StatoDomandaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 0: return 'non presentata';
      case 1: return 'Inviata (modificabile)';
      case 2: return 'inviata (non modificabile)';
    }
  }

}
