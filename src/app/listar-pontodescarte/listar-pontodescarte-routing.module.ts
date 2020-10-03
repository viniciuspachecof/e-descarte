import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPontodescartePage } from './listar-pontodescarte.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPontodescartePage
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPontodescartePageRoutingModule {}
