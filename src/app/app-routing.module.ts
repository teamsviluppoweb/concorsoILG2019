import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import {CONTENT_ROUTES} from './shared/routes/content-layout.routes';

import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {NotFoundComponent} from './layouts/not-found/not-found.component';
import {AuthGuard} from './core/guards';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'apf',
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: CONTENT_ROUTES
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
