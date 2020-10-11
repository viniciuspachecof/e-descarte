import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprovarPontodescarteItemPageRoutingModule } from './aprovar-pontodescarte-item-routing.module';

import { AprovarPontodescarteItemPage } from './aprovar-pontodescarte-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprovarPontodescarteItemPageRoutingModule
  ],
  declarations: [AprovarPontodescarteItemPage]
})
export class AprovarPontodescarteItemPageModule {}
