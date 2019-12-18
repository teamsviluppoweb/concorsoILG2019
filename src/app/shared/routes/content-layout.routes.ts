import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'apf',
    loadChildren: () => import('src/app/modules/application-form/af.module').then(m => m.AfModule)
  },
  {
    path: 'user',
    loadChildren: () => import('src/app/modules/user/user.module').then(m => m.UserModule)
  },
];

