import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RankingPontuacao } from 'src/app/models/rankingpontuacao.interface';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { RankingPontuacaoService } from 'src/app/services/ranking-pontuacao.service';

@Component({
  selector: 'app-rankingpontuacao',
  templateUrl: './rankingpontuacao.page.html',
  styleUrls: ['./rankingpontuacao.page.scss'],
})
export class RankingpontuacaoPage implements OnInit {

  rankingpontuacoes: RankingPontuacao[]

  constructor(
    private rankingpontuacaoService: RankingPontuacaoService,
    private loadingController: LoadingController,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.dataSharingService.displayMenu.next(false);
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({ message: 'Carregando' });
    loading.present();
    this.rankingpontuacaoService.getRankingPontuacoes().subscribe((data) => {
      this.rankingpontuacoes = data;
      loading.dismiss();
    });
  }

}
