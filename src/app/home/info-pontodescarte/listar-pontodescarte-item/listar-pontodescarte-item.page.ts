import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PontoDescarteItem } from 'src/app/models/PontoDescarteItem.interface';
import { PontoDescarteItemService } from 'src/app/services/ponto-descarte-item.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-listar-pontodescarte-item',
  templateUrl: './listar-pontodescarte-item.page.html',
  styleUrls: ['./listar-pontodescarte-item.page.scss'],
})
export class PontodescarteitemPage implements OnInit {

  pontodescarteitens: PontoDescarteItem[];
  pontodescarteId: null
  usuarioId: number

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteitemService: PontoDescarteItemService,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    this.pontodescarteId = this.activatedRoute.snapshot.params['pontodescarteId'],
    this.usuarioId = this.tokenService.getUserId();

    const loading = await this.loadingController.create({ message: 'Carregando' });
    loading.present();
    this.pontodescarteitemService.getPontoDescarteItemByPontoDescarteUsuario(this.pontodescarteId, this.usuarioId).subscribe((data) => {
      this.pontodescarteitens = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(pontodescarteitem: PontoDescarteItem) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir este lixo eletrônico?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(pontodescarteitem);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(pontodescarteitem: PontoDescarteItem) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();

    this.pontodescarteitemService
      .excluir(pontodescarteitem).subscribe(() => {
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
      message: 'Erro ao excluir o lixo eletrônico.',
      buttons: ['OK']
    });

    await alerta.present();
  }
}
