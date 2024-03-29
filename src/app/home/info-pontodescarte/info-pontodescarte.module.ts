import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PontodescartePageRoutingModule } from './info-pontodescarte-routing.module';

import { PontodescartePage } from './info-pontodescarte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PontodescartePageRoutingModule
  ],
  declarations: [PontodescartePage]
})
export class PontodescartePageModule {}
