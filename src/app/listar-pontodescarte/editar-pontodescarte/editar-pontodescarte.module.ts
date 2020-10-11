import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPontoDescartePageRoutingModule } from './editar-pontodescarte-routing.module';

import { EditarPontoDescartePage } from './editar-pontodescarte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPontoDescartePageRoutingModule
  ],
  declarations: [EditarPontoDescartePage]
})
export class EditarPontoDescartePageModule {}
