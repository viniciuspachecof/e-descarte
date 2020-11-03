import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastrarPontoDescartePageRoutingModule } from './cadastrar-pontodescarte-routing.module';

import { CadastrarPontoDescartePage } from './cadastrar-pontodescarte.page';
// import {NgxMaskIonicModule} from 'ngx-mask-ionic';
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarPontoDescartePageRoutingModule,
    // NgxMaskIonicModule.forRoot()
    NgxMaskModule.forRoot(maskConfig)
  ],
  declarations: [CadastrarPontoDescartePage]
})
export class CadastrarPontoDescartePageModule {}
