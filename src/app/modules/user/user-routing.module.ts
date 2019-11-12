import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DomandaCandidatoComponent} from './components/domanda-candidato/domanda-candidato.component';
import {DomandaCandidatoGuardService} from '../../core/guards';
export const routes: Routes = [
  {
    path: '',
    canActivate: [DomandaCandidatoGuardService],
    component: DomandaCandidatoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
