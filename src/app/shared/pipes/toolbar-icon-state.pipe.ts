import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ToolbarIconState'
})
export class ToolbarIconStatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return (args[0]) ? 'close' :  'menu';
  }

}
