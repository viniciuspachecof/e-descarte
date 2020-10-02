import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { PontoDescarte } from '../models/pontodescarte.interface';
import { PontoDescarteService } from '../services/PontoDescarte.service';

@Component({
  selector: 'app-lista-pontodescarte',
  templateUrl: './lista-pontodescarte.page.html',
  styleUrls: ['./lista-pontodescarte.page.scss'],
})
export class ListaPontodescartePage implements OnInit {

  pontosdescarte: PontoDescarte[];

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private pontodescarteService: PontoDescarteService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({ message: 'Carregando' });
    loading.present();
    this.pontodescarteService.getPontosDescarte().subscribe((data) => {
      this.pontosdescarte = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(pontodescarte: PontoDescarte) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir este ponto?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(pontodescarte);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(pontodescarte: PontoDescarte) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();

    this.pontodescarteService
    .excluir(pontodescarte).subscribe(() => {
      busyLoader.dismiss();
      this.listar()
    }, () => {
      busyLoader.dismiss();
      this.mensagemAlerta();
    });
  }

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao excluir o ponto.',
      buttons: ['OK']
    });

    await alerta.present();
  }

}
