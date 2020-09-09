import { Component, OnInit } from '@angular/core';
import { PontoDescarte } from '../models/PontoDescarte.interface';
import { LoadingController } from '@ionic/angular';
import { PontoDescarteService } from '../services/PontoDescarte.service';

@Component({
  selector: 'app-cadastrar-ponto',
  templateUrl: './cadastrar-ponto.page.html',
  styleUrls: ['./cadastrar-ponto.page.scss'],
})
export class CadastrarPontoPage implements OnInit {

  pontosdescarte: PontoDescarte[];

  constructor(
    private pontodescarteService: PontoDescarteService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  };

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    loading.present();
    this.pontodescarteService.getPontosDescarte().subscribe((data) => {
      this.pontosdescarte = data;
      loading.dismiss();
    });
  };
}
