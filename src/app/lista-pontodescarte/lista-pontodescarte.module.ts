import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPontodescartePageRoutingModule } from './lista-pontodescarte-routing.module';

import { ListaPontodescartePage } from './lista-pontodescarte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPontodescartePageRoutingModule
  ],
  declarations: [ListaPontodescartePage]
})
export class ListaPontodescartePageModule {}
