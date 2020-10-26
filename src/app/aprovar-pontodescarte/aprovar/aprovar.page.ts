import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Cidade } from 'src/app/models/cidade.interface';
import { PontoDescarte } from 'src/app/models/pontodescarte.interface';
import { CidadeService } from 'src/app/services/cidade.service';
import { PontoDescarteService } from 'src/app/services/ponto-descarte.service';

@Component({
  selector: 'app-aprovar',
  templateUrl: './aprovar.page.html',
  styleUrls: ['./aprovar.page.scss'],
})
export class AprovarPage implements OnInit {

  pontodescarte: PontoDescarte;
  cidades: Cidade[];  

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteService: PontoDescarteService,
    private cidadeService: CidadeService,
    private navController: NavController,
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
      cidadeId: null,
      cidade: null,
    }
  }

  async ngOnInit() {
    this.listarCidades();
  }

  async listarCidades() {
    const loading = await this.loadingController.create({ message: 'Carregando cidades' });
    loading.present();

    this.cidadeService.getCidades().subscribe((data) => {
      this.cidades = data;
      this.carregarPontoDescate();
      loading.dismiss();
    });
  }

  carregarPontoDescate() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.pontodescarteService.getPontoDescarte(id).subscribe((pontodescarte) => {
      this.pontodescarte = pontodescarte;
    });
  }

  async salvar() {
    this.pontodescarte.usuario = null;
    this.pontodescarte.cidade = null;

    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.pontodescarteService
      .salvar(this.pontodescarte)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/aprovar-pontodescarte']);
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  }

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao liberar o ponto.',
      buttons: ['OK']
    });

    await alerta.present();
  }
}
