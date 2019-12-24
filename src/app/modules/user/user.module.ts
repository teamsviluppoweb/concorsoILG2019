import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/models/shared.module';
import {UserRoutingModule} from './user-routing.module';
import {CommonModule} from '@angular/common';
import {DomandaCandidatoComponent} from './components/domanda-candidato/domanda-candidato.component';
import { EsitiComponent } from './components/esiti/esiti.component';



@NgModule({
  declarations: [
    DomandaCandidatoComponent,
    EsitiComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    CommonModule,
  ]
})

export class UserModule {}
