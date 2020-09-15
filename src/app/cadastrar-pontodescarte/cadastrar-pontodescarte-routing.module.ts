import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarPontoDescartePage } from './cadastrar-pontodescarte.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarPontoDescartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarPontoDescartePageRoutingModule {}
