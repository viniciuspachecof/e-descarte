import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPontodescartePage } from './lista-pontodescarte.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPontodescartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPontodescartePageRoutingModule {}
