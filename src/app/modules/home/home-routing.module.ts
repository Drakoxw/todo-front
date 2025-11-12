import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    data: {
      slug: 'index',
    },
    loadComponent: () =>
      import('@home-module/ui/home-index/home-index.component'),
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export default class HomeRoutingModule { }
