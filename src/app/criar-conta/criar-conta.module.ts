import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarContaPageRoutingModule } from './criar-conta-routing.module';

import { CriarContaPage } from './criar-conta.page';
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
    CriarContaPageRoutingModule,
    // NgxMaskIonicModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig)
  ],
  declarations: [CriarContaPage]
})
export class CriarContaPageModule {}
