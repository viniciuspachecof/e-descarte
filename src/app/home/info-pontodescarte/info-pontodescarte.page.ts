import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Cidade } from 'src/app/models/cidade.interface';
import { PontoDescarte } from 'src/app/models/pontodescarte.interface';
import { CidadeService } from 'src/app/services/cidade.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { PontoDescarteService } from 'src/app/services/ponto-descarte.service';

@Component({
  selector: 'app-pontodescarte',
  templateUrl: './info-pontodescarte.page.html',
  styleUrls: ['./info-pontodescarte.page.scss'],
})
export class PontodescartePage implements OnInit {

  pontodescarte: PontoDescarte;
  cidades: Cidade[];
  isCatador: boolean;  
  isAdmin: boolean;  

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteService: PontoDescarteService,
    private cidadeService: CidadeService,
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
      cidadeId: null,
      cidade: null,
    }
  }

  async ngOnInit() {
    this.dataSharingService.isCatador.subscribe(value => {
      this.isCatador = value;
    });
    this.dataSharingService.isAdmin.subscribe(value => {
      this.isAdmin = value;
    });
    this.dataSharingService.displayMenu.next(false);
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

  navigate() {
    window.open('https://www.google.com/maps/dir/?api=1&destination=' + this.pontodescarte.latitude + ',' + this.pontodescarte.longitude)
  }
}
