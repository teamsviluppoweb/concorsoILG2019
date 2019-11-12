import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/models/shared.module';
import {UserRoutingModule} from './user-routing.module';
import {CommonModule} from '@angular/common';
import { DomandaCandidatoComponent } from './components/domanda-candidato/domanda-candidato.component';
import {DomandaCandidatoGuardService} from '../../core/guards';



@NgModule({
  declarations: [
  DomandaCandidatoComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    CommonModule,
  ],
  providers: [
    DomandaCandidatoGuardService,
  ]
})

export class UserModule {}
