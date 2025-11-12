import { Routes } from '@angular/router';

import { PATH } from '@constants/index';
import { LayoutComponent } from '@shared/components';
import { authGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: PATH.HOME,
        canActivate: [authGuard],
        loadChildren: () => import('@home-module/home-routing.module'),
      },
      {
        path: PATH.ABOUT,
        canActivate: [authGuard],
        loadChildren: () => import('@about-module/about-routing.module'),
      },
      {
        path: PATH.TO_DO,
        canActivate: [authGuard],
        loadChildren: () => import('@todo-module/todo-routing.module'),
      },
      {
        path: PATH.AUTH,
        loadChildren: () => import('@auth-module/auth-routing.module'),
      },
      {
        path: PATH.LOGOUT,
        canActivate: [authGuard],
        loadChildren: () => import('@logout-module/logout-routing.module'),
      },
      { path: '', redirectTo: PATH.AUTH, pathMatch: 'full' },
      { path: '**', redirectTo: PATH.AUTH, pathMatch: 'full' },
    ],
  },
];
