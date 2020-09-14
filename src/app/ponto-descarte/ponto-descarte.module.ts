import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PontoDescartePageRoutingModule } from './ponto-descarte-routing.module';

import { PontoDescartePage } from './ponto-descarte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PontoDescartePageRoutingModule
  ],
  declarations: [PontoDescartePage]
})
export class PontoDescartePageModule {}
