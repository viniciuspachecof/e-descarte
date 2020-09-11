import { Component, OnInit } from '@angular/core';
import { PontoDescarte } from '../models/PontoDescarte.interface';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PontoDescarteService } from '../services/PontoDescarte.service';

@Component({
  selector: 'app-cadastrar-ponto',
  templateUrl: './cadastrar-ponto.page.html',
  styleUrls: ['./cadastrar-ponto.page.scss'],
})
export class CadastrarPontoPage implements OnInit {

  pontodescarte: PontoDescarte;

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    private loadingController: LoadingController,
    private pontodescarteService: PontoDescarteService
  ) {
    this.pontodescarte = {
      nome: null,
      fone: null,
      latitude: null,
      longitude: null
    }
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
  };

  async salvar() {
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();    

    this.pontodescarteService
      .salvar(this.pontodescarte)
      .subscribe(() => {
        loading.dismiss();
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  }

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao salvar o cliente.',
      buttons: ['OK']
    });

    await alerta.present();
  };
  
}
