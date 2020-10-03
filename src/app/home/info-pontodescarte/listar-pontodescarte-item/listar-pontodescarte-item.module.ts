import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PontodescarteitemPageRoutingModule } from './listar-pontodescarte-item-routing.module';

import { PontodescarteitemPage } from './listar-pontodescarte-item.page';

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
