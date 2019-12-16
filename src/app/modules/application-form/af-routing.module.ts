import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditComponent} from './components/edit/edit.component';
import {EditGuard} from '../../core/guards/edit.guard';
import {PaginaIntermediaComponent} from './components/pagina-intermedia/pagina-intermedia.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'info',
  },
  {
    path: 'compile',
    canDeactivate: [EditGuard],
    component: EditComponent,
    // resolve: EditResolver,
  },
  {
    path: 'info',
    component: PaginaIntermediaComponent,
    // resolve: EditResolver,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfRoutingModule { }
