import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastrarPontoPage } from './cadastrar-ponto.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarPontoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrarPontoPageRoutingModule {}
