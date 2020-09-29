import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PontodescarteitemPage } from './pontodescarteitem.page';

const routes: Routes = [
  {
    path: '',
    component: PontodescarteitemPage
  },
  {
    path: 'cadastro/:pontodescarteId/:usuarioId',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  }, 
  {
    path: 'editar/:id/:pontodescarteId/:usuarioId',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PontodescarteitemPageRoutingModule {}
