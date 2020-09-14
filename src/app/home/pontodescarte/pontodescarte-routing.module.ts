import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PontodescartePage } from './pontodescarte.page';

const routes: Routes = [
  {
    path: '',
    component: PontodescartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PontodescartePageRoutingModule {}
