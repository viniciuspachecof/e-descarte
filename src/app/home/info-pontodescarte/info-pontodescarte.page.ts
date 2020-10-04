import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Cidade } from 'src/app/models/cidade.interface';
import { PontoDescarte } from 'src/app/models/pontodescarte.interface';
import { Usuario } from 'src/app/models/Usuario.interface';
import { CidadeService } from 'src/app/services/cidade.service';
import { PontoDescarteService } from 'src/app/services/ponto-descarte.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pontodescarte',
  templateUrl: './info-pontodescarte.page.html',
  styleUrls: ['./info-pontodescarte.page.scss'],
})
export class PontodescartePage implements OnInit {

  pontodescarte: PontoDescarte;
  usuarios: Usuario[];
  cidades: Cidade[];
  usuarioId: null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteService: PontoDescarteService,
    private usuarioService: UsuarioService,
    private cidadeService: CidadeService
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

  navigate() {
    window.open('https://www.google.com/maps/dir/?api=1&destination=' + this.pontodescarte.latitude + ',' + this.pontodescarte.longitude)
  }
}