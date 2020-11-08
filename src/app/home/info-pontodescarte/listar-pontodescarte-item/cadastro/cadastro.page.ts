import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Item } from 'src/app/models/Item.interface';
import { PontoDescarteItem } from 'src/app/models/PontoDescarteItem.interface';
import { ItemService } from 'src/app/services/item.service';
import { PontoDescarteItemService } from 'src/app/services/ponto-descarte-item.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  pontodescarteitem: PontoDescarteItem
  itens: Item[];
  itemPonto: number;

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteitemService: PontoDescarteItemService,
    private itemService: ItemService,
    private tokenService: TokenService,
    private navController: NavController,
  ) {
    this.pontodescarteitem = {
      quant: 1,
      status: 0,
      totalponto: 0,
      pontodescarteId: this.activatedRoute.snapshot.params['pontodescarteId'],
      pontoDescarte: null,
      itemId: null,
      item: null,
      usuarioId: this.tokenService.getUserId(),
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
    this.itemService.getItem(this.pontodescarteitem.itemId).subscribe((data) => {
      this.itemPonto = data.ponto;

      this.adicionarPontoDescarteItem();
    });
  }

  async adicionarPontoDescarteItem() {
    this.pontodescarteitem.pontoDescarte = null;
    this.pontodescarteitem.item = null;
    this.pontodescarteitem.usuario = null;
    this.pontodescarteitem.totalponto = this.pontodescarteitem.quant * this.itemPonto

    let pontodescarteId = this.pontodescarteitem.pontodescarteId;      

    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.pontodescarteitemService
      .salvar(this.pontodescarteitem)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/info-pontodescarte', pontodescarteId]);  
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
};
