import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPontoPageRoutingModule } from './cadastrar-ponto-routing.module';

import { CadastrarPontoPage } from './cadastrar-ponto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarPontoPageRoutingModule
  ],
  declarations: [CadastrarPontoPage]
})
export class CadastrarPontoPageModule {}
