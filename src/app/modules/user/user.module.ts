import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/models/shared.module';
import {UserRoutingModule} from './user-routing.module';
import {CommonModule} from '@angular/common';
import {DomandaCandidatoComponent} from './components/domanda-candidato/domanda-candidato.component';



@NgModule({
  declarations: [
    DomandaCandidatoComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    CommonModule,
  ]
})

export class UserModule {}
