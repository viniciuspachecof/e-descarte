import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPontoDescartePageRoutingModule } from './cadastrar-pontodescarte-routing.module';

import { CadastrarPontoDescartePage } from './cadastrar-pontodescarte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarPontoDescartePageRoutingModule
  ],
  declarations: [CadastrarPontoDescartePage]
})
export class CadastrarPontoDescartePageModule {}
