import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    data: {
      slug: 'index',
    },
    loadComponent: () =>
      import('@about-module/ui/about-index/about-index.component'),
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export default class AboutRoutingModule { }
