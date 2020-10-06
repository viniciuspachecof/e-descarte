import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
    path: '',
    redirectTo: 'login',
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
    path: 'info-pontodescarte',
    loadChildren: () => import('./home/info-pontodescarte/info-pontodescarte.module').then( m => m.PontodescartePageModule)
  }, 
  {
    path: 'listar-pontodescarte-item',
    loadChildren: () => import('./home/info-pontodescarte/listar-pontodescarte-item/listar-pontodescarte-item.module').then( m => m.PontodescarteitemPageModule)
  },
  {
    path: 'listar-pontodescarte',
    loadChildren: () => import('./listar-pontodescarte/listar-pontodescarte.module').then( m => m.ListaPontodescartePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
