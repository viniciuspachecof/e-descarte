import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PontoDescarteItem } from 'src/app/models/PontoDescarteItem.interface';
import { PontoDescarteItemService } from 'src/app/services/ponto-descarte-item.service';

@Component({
  selector: 'app-aprovar-pontodescarte-item',
  templateUrl: './aprovar-pontodescarte-item.page.html',
  styleUrls: ['./aprovar-pontodescarte-item.page.scss'],
})
export class AprovarPontodescarteItemPage implements OnInit {

  pontodescarteitens: PontoDescarteItem[];
  pontodescarteNome: string;
  pontodescarteId: null

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteitemService: PontoDescarteItemService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    this.pontodescarteId = this.activatedRoute.snapshot.params['pontodescarteId'];

    const loading = await this.loadingController.create({ message: 'Carregando' });
    loading.present();
    this.pontodescarteitemService.getPontoDescarteItemByPontoDescarte(this.pontodescarteId).subscribe((data) => {
      if (data.length>0) {
        this.pontodescarteNome = data[0]['pontodescarte'].nome
      }      
      this.pontodescarteitens = data;
      loading.dismiss();
    });
  }
}
