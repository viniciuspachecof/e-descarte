import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Cidade } from 'src/app/models/cidade.interface';
import { PontoDescarte } from 'src/app/models/pontodescarte.interface';
import { Usuario } from 'src/app/models/Usuario.interface';
import { CidadeService } from 'src/app/services/cidade.service';
import { PontoDescarteService } from 'src/app/services/ponto-descarte.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-pontodescarte',
  templateUrl: './editar-pontodescarte.page.html',
  styleUrls: ['./editar-pontodescarte.page.scss'],
})
export class EditarPontoDescartePage implements OnInit {

  pontodescarte: PontoDescarte;
  usuarios: Usuario[];
  cidades: Cidade[];  

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteService: PontoDescarteService,
    private usuarioService: UsuarioService,
    private cidadeService: CidadeService,
    private navController: NavController,
  ) {
    this.pontodescarte = {
      nome: null,
      fone: null,
      latitude: null,
      longitude: null,
      status: true,
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
      this.listarUsuarios();
      loading.dismiss();
    });
  }

  async listarUsuarios() {
    const loading = await this.loadingController.create({ message: 'Carregando usuários' });
    loading.present();

    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
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

  onchangeStatus() {
    this.pontodescarte.status = true
  }

  async salvar() {
    let dto = {
        id: this.pontodescarte.id,
        nome: this.pontodescarte.nome,
        fone: this.pontodescarte.fone,
        longitude: this.pontodescarte.longitude,
        latitude: this.pontodescarte.latitude,
        status: this.pontodescarte.status,
        usuarioId: this.pontodescarte.usuarioId,
        usuario: null,
        cidadeId: this.pontodescarte.cidadeId,
        cidade: null
      };

    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.pontodescarteService
      .salvar(dto)
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

  onChangeStatus($event) {
    console.log()
  }
}
