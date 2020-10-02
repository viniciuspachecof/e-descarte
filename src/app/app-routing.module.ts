import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'criar-conta',
    loadChildren: () => import('./criar-conta/criar-conta.module').then( m => m.CriarContaPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then( m => m.SobrePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'fale-conosco',
    loadChildren: () => import('./fale-conosco/fale-conosco.module').then( m => m.FaleConoscoPageModule)
  },
  {
    path: 'cadastrar-pontodescarte',
    loadChildren: () => import('./cadastrar-pontodescarte/cadastrar-pontodescarte.module').then( m => m.CadastrarPontoDescartePageModule)
  },
  {
    path: 'ponto-descarte',
    loadChildren: () => import('./home/pontodescarte/pontodescarte.module').then( m => m.PontodescartePageModule)
  }, 
  {
    path: 'ponto-descarte-item',
    loadChildren: () => import('./home/pontodescarte/pontodescarteitem/pontodescarteitem.module').then( m => m.PontodescarteitemPageModule)
  },  {
    path: 'lista-pontodescarte',
    loadChildren: () => import('./lista-pontodescarte/lista-pontodescarte.module').then( m => m.ListaPontodescartePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
