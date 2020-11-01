import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { PontoDescarte } from 'src/app/models/pontodescarte.interface';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { PontoDescarteService } from 'src/app/services/ponto-descarte.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-editar-pontodescarte',
  templateUrl: './editar-pontodescarte.page.html',
  styleUrls: ['./editar-pontodescarte.page.scss'],
})
export class EditarPontoDescartePage implements OnInit {

  pontodescarte: PontoDescarte;

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteService: PontoDescarteService,
    private navController: NavController,
    private tokenService: TokenService,
    private dataSharingService: DataSharingService
  ) {
    this.pontodescarte = {
      nome: null,
      fone: null,
      latitude: null,
      longitude: null,
      ativo: true,
      status: false,
      tipo: null,
      usuarioId: null,
      usuario: null,
    }
  }

  async ngOnInit() {
    this.dataSharingService.displayMenu.next(false);
    this.carregarPontoDescate();
  }

  carregarPontoDescate() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.pontodescarteService.getPontoDescarte(id).subscribe((pontodescarte) => {
      this.pontodescarte = pontodescarte;
    });
  }

  async salvar() {    
    this.pontodescarte.usuario = null;
 
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.pontodescarteService
      .salvar(this.pontodescarte)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/listar-pontodescarte']);
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  }

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao editar o ponto.',
      buttons: ['OK']
    });

    await alerta.present();
  }
}
