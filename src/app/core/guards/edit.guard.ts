import {Injectable, ViewChild} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {EditComponent} from '../../modules/application-form/components/edit/edit.component';


@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanDeactivate<EditComponent> {

  /*
  # Angular 8 feature
  # https://github.com/angular/angular/issues/30291
  */
  @ViewChild('ngForm', {static: true}) myForm;

  canDeactivate(component: EditComponent): boolean {
    /*
        if (component.formInSubmittingState) {
          return true;
        }
     */

    if (component.isDirty) {
      return confirm(`Se esci senza aggiornare o inviare la domanda perderai tutti i dati immessi, Sicuro di voler uscire?`);
    }
    return true;
  }
}
