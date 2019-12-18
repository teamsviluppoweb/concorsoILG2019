import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/models/shared.module';
import {UserRoutingModule} from './user-routing.module';
import {CommonModule} from '@angular/common';
import {PaginaIntermediaComponent} from './pagina-intermedia/pagina-intermedia.component';
import {DomandaCandidatoComponent} from './components/domanda-candidato/domanda-candidato.component';



@NgModule({
  declarations: [
    PaginaIntermediaComponent,
    DomandaCandidatoComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    CommonModule,
  ]
})

export class UserModule {}
