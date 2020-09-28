import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PontodescartePage } from './pontodescarte.page';

const routes: Routes = [
  {
    path: '',
    component: PontodescartePage
  },
  {
    path: ':pontodescarteId/:usuarioId',
    loadChildren: () => import('./pontodescarteitem/pontodescarteitem.module').then(m => m.PontodescarteitemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PontodescartePageRoutingModule {}
