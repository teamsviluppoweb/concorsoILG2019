import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/models/shared.module';
import {AfRoutingModule} from './af-routing.module';
import {CommonModule} from '@angular/common';
import {StepDichiarazioneComponent} from './components/edit/step-dichiarazione/step-dichiarazione.component';
import {StepTitoliPreferenzialiComponent} from './components/edit/step-titoli-preferenziali/step-titoli-preferenziali.component';
import {StepRiserveComponent} from './components/edit/step-riserve/step-riserve.component';
import {StepLinguaComponent} from './components/edit/step-lingua/step-lingua.component';
import {StepInviaDomandaComponent} from './components/edit/step-invia-domanda/step-invia-domanda.component';
import {StepIstruzioneComponent} from './components/edit/step-istruzione/step-istruzione.component';
import {StepCategorieProtetteComponent} from './components/edit/step-categorie-protette/step-categorie-protette.component';
import {StepAnagraficaComponent} from './components/edit/step-anagrafica/step-anagrafica.component';
import {EditComponent} from './components/edit/edit.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { StepperComponent } from './components/edit/stepper/stepper.component';


@NgModule({
  declarations: [
    EditComponent,
    StepAnagraficaComponent,
    StepCategorieProtetteComponent,
    StepDichiarazioneComponent,
    StepIstruzioneComponent,
    StepInviaDomandaComponent,
    StepLinguaComponent,
    StepRiserveComponent,
    StepTitoliPreferenzialiComponent,
    StepDichiarazioneComponent,
    StepperComponent,
  ],
  imports: [
    AfRoutingModule,
    NgxMatSelectSearchModule,
    SharedModule,
    CommonModule,
  ],
  providers: [],
})

export class AfModule {}
