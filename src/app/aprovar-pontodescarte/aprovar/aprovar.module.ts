import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprovarPageRoutingModule } from './aprovar-routing.module';

import { AprovarPage } from './aprovar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprovarPageRoutingModule
  ],
  declarations: [AprovarPage]
})
export class AprovarPageModule {}
