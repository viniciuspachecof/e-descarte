import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { PontoDescarte } from '../models/pontodescarte.interface';
import { DataSharingService } from '../services/data-sharing.service';
import { PontoDescarteService } from '../services/ponto-descarte.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-aprovar-pontodescarte',
  templateUrl: './aprovar-pontodescarte.page.html',
  styleUrls: ['./aprovar-pontodescarte.page.scss'],
})
export class AprovarPontodescartePage implements OnInit {

  pontosdescarte: PontoDescarte[];

  constructor(
    private loadingController: LoadingController,
    private pontodescarteService: PontoDescarteService,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.dataSharingService.displayMenu.next(true);
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({ message: 'Carregando' });
    loading.present();
    this.pontodescarteService.getPontosDescarteStatus().subscribe((data) => {
      this.pontosdescarte = data;
      loading.dismiss();
    });
  }
}
