import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PontoDescarte } from 'src/app/models/pontodescarte.interface';
import { PontoDescarteService } from 'src/app/services/PontoDescarte.service';

@Component({
  selector: 'app-pontodescarte',
  templateUrl: './pontodescarte.page.html',
  styleUrls: ['./pontodescarte.page.scss'],
})
export class PontodescartePage implements OnInit {

  pontodescarte: PontoDescarte;

  constructor(
    private activatedRoute: ActivatedRoute,
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

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    const loading = await this.loadingController.create({ message: 'Carregando' });
    loading.present();
    this.pontodescarteService.getPontoDescarte(id).subscribe((pontodescarte) => {
      this.pontodescarte = pontodescarte;      
      loading.dismiss();
    });
  }

  navigate() {
    window.open('https://www.google.com/maps/dir/?api=1&destination=' + this.pontodescarte.latitude + ',' + this.pontodescarte.longitude)
  }
}
