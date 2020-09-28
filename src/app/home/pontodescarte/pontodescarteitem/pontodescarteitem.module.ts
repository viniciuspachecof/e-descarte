import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PontodescarteitemPageRoutingModule } from './pontodescarteitem-routing.module';

import { PontodescarteitemPage } from './pontodescarteitem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PontodescarteitemPageRoutingModule
  ],
  declarations: [PontodescarteitemPage]
})
export class PontodescarteitemPageModule {}
