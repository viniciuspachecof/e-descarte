import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PontoDescarteItem } from 'src/app/models/PontoDescarteItem.interface';
import { PontoDescarteItemService } from 'src/app/services/ponto-descarte-item.service';

@Component({
  selector: 'app-pontodescarteitem',
  templateUrl: './pontodescarteitem.page.html',
  styleUrls: ['./pontodescarteitem.page.scss'],
})
export class PontodescarteitemPage implements OnInit {

  pontodescarteitens: PontoDescarteItem[];
  pontodescarteId: null
  usuarioId: null

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteitemService: PontoDescarteItemService,
  ) { }

  async ngOnInit() {
    this.pontodescarteId = this.activatedRoute.snapshot.params['pontodescarteId'];
    this.usuarioId = this.activatedRoute.snapshot.params['usuarioId'];

    const loading = await this.loadingController.create({ message: 'Carregando' });
    loading.present();
    this.pontodescarteitemService.getPontoDescarteItemByPontoDescarte(this.pontodescarteId, this.usuarioId).subscribe((data) => {
      this.pontodescarteitens = data;
      loading.dismiss();
    });
  }

}
