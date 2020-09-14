import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PontoDescartePage } from './ponto-descarte.page';

const routes: Routes = [
  {
    path: '',
    component: PontoDescartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PontoDescartePageRoutingModule {}
