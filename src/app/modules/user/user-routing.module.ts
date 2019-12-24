import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DomandaCandidatoComponent} from './components/domanda-candidato/domanda-candidato.component';
import {globalRoutes} from '../../shared/routes/global-routes';
import {VisualizzaDomandaGuard} from '../../core/guards';
import {EsitiComponent} from './components/esiti/esiti.component';
import {VisualizzaEsitiGuard} from '../../core/guards/visualizza-esiti.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: globalRoutes.user.visualizzaDomanda,
    pathMatch: 'full'
  },
  {
    path:  globalRoutes.user.visualizzaDomanda,
    canActivate: [VisualizzaDomandaGuard],
    component: DomandaCandidatoComponent
  },
  {
    path:  globalRoutes.user.esiti,
    canActivate: [VisualizzaEsitiGuard],
    component: EsitiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
