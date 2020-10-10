import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PontodescarteitemPage } from './listar-pontodescarte-item.page';

const routes: Routes = [
  {
    path: '',
    component: PontodescarteitemPage
  },
  {
    path: 'cadastro/:pontodescarteId',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  }, 
  {
    path: 'editar/:id/:pontodescarteId',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PontodescarteitemPageRoutingModule {}
