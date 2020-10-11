import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPontodescartePage } from './listar-pontodescarte.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPontodescartePage
  },
  {
    path: ':id',
    loadChildren: () => import('./editar-pontodescarte/editar-pontodescarte.module').then( m => m.EditarPontoDescartePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPontodescartePageRoutingModule {}
