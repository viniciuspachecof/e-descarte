import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprovarPontodescarteItemPage } from './aprovar-pontodescarte-item.page';

const routes: Routes = [
  {
    path: '',
    component: AprovarPontodescarteItemPage
  },
  {
    path: 'aprovar/:id/:pontodescarteId',
    loadChildren: () => import('./aprovar/aprovar.module').then( m => m.AprovarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprovarPontodescarteItemPageRoutingModule {}
