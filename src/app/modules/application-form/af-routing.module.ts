import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditComponent} from './components/edit/edit.component';
import {EditGuard} from '../../core/guards/edit.guard';
export const routes: Routes = [
  {
    path: '',
    canDeactivate: [EditGuard],
    component: EditComponent,
    // resolve: EditResolver,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfRoutingModule { }
