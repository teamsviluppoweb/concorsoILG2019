import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditComponent} from './components/edit/edit.component';
import {EditGuard} from '../../core/guards/edit.guard';
import {globalRoutes} from '../../shared/routes/global-routes';
export const routes: Routes = [
  {
    path: '',
    redirectTo: globalRoutes.apf.compilaDomanda,
  },
  {
    path: globalRoutes.apf.compilaDomanda,
    canDeactivate: [EditGuard],
    component: EditComponent,
    // resolve: EditResolver,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfRoutingModule { }
