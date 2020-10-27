import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprovarPontodescartePage } from './aprovar-pontodescarte.page';

const routes: Routes = [
  {
    path: '',
    component: AprovarPontodescartePage
  },
  {
    path: 'aprovar/:id',
    loadChildren: () => import('./aprovar/aprovar.module').then( m => m.AprovarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprovarPontodescartePageRoutingModule {}
