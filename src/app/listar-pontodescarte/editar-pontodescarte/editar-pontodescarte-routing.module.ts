import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPontoDescartePage } from './editar-pontodescarte.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPontoDescartePage
  },
  {
    path: ':pontodescarteId',
    loadChildren: () => import('./aprovar-pontodescarte-item/aprovar-pontodescarte-item.module').then( m => m.AprovarPontodescarteItemPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPontoDescartePageRoutingModule {}
