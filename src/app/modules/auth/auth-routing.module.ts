import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    data: {
      slug: 'index',
    },
    loadComponent: () =>
      import('@auth-module/ui/auth-index/auth-index.component'),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@auth-module/ui/register-index/register-index.component'),
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export default class AuthRoutingModule { }
