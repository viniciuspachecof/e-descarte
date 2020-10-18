import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PontoDescarteItem } from 'src/app/models/PontoDescarteItem.interface';
import { PontoDescarteItemService } from 'src/app/services/ponto-descarte-item.service';
import { PontoDescarteService } from 'src/app/services/ponto-descarte.service';

@Component({
  selector: 'app-aprovar-pontodescarte-item',
  templateUrl: './aprovar-pontodescarte-item.page.html',
  styleUrls: ['./aprovar-pontodescarte-item.page.scss'],
})
export class AprovarPontodescarteItemPage implements OnInit {

  pontodescarteitens: PontoDescarteItem[];
  pontodescarteId: null
  pontodescarteNome: string;
  usuarioNome: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteitemService: PontoDescarteItemService,
    private pontodescarteService: PontoDescarteService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    this.pontodescarteId = this.activatedRoute.snapshot.params['pontodescarteId'];

    this.pontodescarteService.getPontoDescarte(this.pontodescarteId).subscribe((data) => {
      this.pontodescarteNome = data.nome
    });

    const loading = await this.loadingController.create({ message: 'Carregando' });
    loading.present();
    this.pontodescarteitemService.getPontoDescarteItemByPontoDescarte(this.pontodescarteId).subscribe((data) => {        
      this.pontodescarteitens = data;
      loading.dismiss();
    });
  }

  async buscarClienteFiltro() {
    const loading = await this.loadingController.create({ message: 'Buscando...' });
    loading.present();

    if (this.usuarioNome) {
      this.pontodescarteitemService.getPontoDescarteItemByPontoDescarteUsuarioNome(this.pontodescarteId, this.usuarioNome).subscribe((data) => {        
        this.pontodescarteitens = data;     
        loading.dismiss(); 
      });
    } else {
      this.pontodescarteitemService.getPontoDescarteItemByPontoDescarte(this.pontodescarteId).subscribe((data) => {        
        this.pontodescarteitens = data;
        loading.dismiss();
      });
    }
  }
}
