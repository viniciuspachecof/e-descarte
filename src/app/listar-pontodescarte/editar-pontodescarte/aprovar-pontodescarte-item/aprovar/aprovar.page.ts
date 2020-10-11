import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Item } from 'src/app/models/Item.interface';
import { PontoDescarteItem } from 'src/app/models/PontoDescarteItem.interface';
import { ItemService } from 'src/app/services/item.service';
import { PontoDescarteItemService } from 'src/app/services/ponto-descarte-item.service';

@Component({
  selector: 'app-aprovar',
  templateUrl: './aprovar.page.html',
  styleUrls: ['./aprovar.page.scss'],
})
export class AprovarPage implements OnInit {

  pontodescarteitem: PontoDescarteItem
  itens: Item[];

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private navController: NavController,
    private pontodescarteitemService: PontoDescarteItemService,
    private itemService: ItemService,
  ) {
    this.pontodescarteitem = {
      quant: 0,
      status: 0,
      pontodescarteId: this.activatedRoute.snapshot.params['pontodescarteId'],
      pontoDescarte: null,
      itemId: null,
      item: null,
      usuarioId: null,
      usuario: null
    }
  }

  async ngOnInit() {
    this.listarItens();
  }

  async listarItens() {
    const loading = await this.loadingController.create({ message: 'Carregando' });
    loading.present();

    this.itemService.getItens().subscribe((data) => {
      this.itens = data;
      this.carregarPontoDescateItens();
      loading.dismiss();
    });
  }

  carregarPontoDescateItens() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.pontodescarteitemService.getPontoDescarteItem(id).subscribe((data) => {
        this.pontodescarteitem = data;
      });
    }
  }

  async salvar() {   
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.pontodescarteitemService
      .salvar(this.pontodescarteitem)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/editar-pontodescarte', this.pontodescarteitem.pontodescarteId]);
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  }

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao salvar o item.',
      buttons: ['OK']
    });

    await alerta.present();
  }

}
