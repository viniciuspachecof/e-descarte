import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingpontuacaoPageRoutingModule } from './rankingpontuacao-routing.module';

import { RankingpontuacaoPage } from './rankingpontuacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingpontuacaoPageRoutingModule
  ],
  declarations: [RankingpontuacaoPage]
})
export class RankingpontuacaoPageModule {}
