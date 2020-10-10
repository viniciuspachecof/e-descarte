import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PontodescartePage } from './info-pontodescarte.page';

const routes: Routes = [
  {
    path: '',
    component: PontodescartePage
  },
  {
    path: ':pontodescarteId',
    loadChildren: () => import('./listar-pontodescarte-item/listar-pontodescarte-item.module').then(m => m.PontodescarteitemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PontodescartePageRoutingModule {}
