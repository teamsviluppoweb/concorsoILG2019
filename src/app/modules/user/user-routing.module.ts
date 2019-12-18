import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DomandaCandidatoComponent} from './components/domanda-candidato/domanda-candidato.component';
import {PaginaIntermediaComponent} from './pagina-intermedia/pagina-intermedia.component';
import {globalRoutes} from '../../shared/routes/global-routes';
import {VisualizzaDomandaGuard} from '../../core/guards/visualizza-domanda.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: globalRoutes.user.info,
    pathMatch: 'full'
  },
  {
    path:  globalRoutes.user.visualizzaDomanda,
    canActivate: [VisualizzaDomandaGuard],
    component: DomandaCandidatoComponent
  },
  {
    path: globalRoutes.user.info,
    component: PaginaIntermediaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
