import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprovarPontodescartePageRoutingModule } from './aprovar-pontodescarte-routing.module';

import { AprovarPontodescartePage } from './aprovar-pontodescarte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprovarPontodescartePageRoutingModule
  ],
  declarations: [AprovarPontodescartePage]
})
export class AprovarPontodescartePageModule {}
