import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pontodescarte/pontodescarte.module').then(m => m.PontodescartePageModule)
  },
  {
    path: 'visualizar/:id',
    loadChildren: () => import('./pontodescarte/pontodescarte.module').then(m => m.PontodescartePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
