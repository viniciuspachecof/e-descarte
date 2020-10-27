import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprovarPage } from './aprovar.page';

const routes: Routes = [
  {
    path: '',
    component: AprovarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprovarPageRoutingModule {}
