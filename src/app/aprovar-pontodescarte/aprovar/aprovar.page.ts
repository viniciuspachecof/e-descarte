import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { PontoDescarte } from 'src/app/models/pontodescarte.interface';
import { PontoDescarteService } from 'src/app/services/ponto-descarte.service';

declare var google: any;

@Component({
  selector: 'app-aprovar',
  templateUrl: './aprovar.page.html',
  styleUrls: ['./aprovar.page.scss'],
})
export class AprovarPage implements OnInit {
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  map: any;
  infoWindows: any = [];
  pontodescarte: PontoDescarte;

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteService: PontoDescarteService,
    private navController: NavController,
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
    }
  }

  async ngOnInit() {
    this.carregarPontoDescate();
  }

  carregarPontoDescate() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.pontodescarteService.getPontoDescarte(id).subscribe((pontodescarte) => {
      this.pontodescarte = pontodescarte;
      this.carregarMapa(this.pontodescarte.latitude, this.pontodescarte.longitude);
    });
  }

  carregarMapa(lat, long) {
      const location = new google.maps.LatLng(lat, long);
      const options = {
        center: location,
        zoom: 15,
        disableDefaultUI: true
      };

      this.map = new google.maps.Map(this.mapRef.nativeElement, options);

      this.addMarkerToMap(location, lat, long);   
  }

  addMarkerToMap(location, userLat, userLong) {
    let mapMarker = new google.maps.Marker({
      title: this.pontodescarte.nome,
      position: location,
      latitude: userLat,
      longitude: userLong,
      // icon: 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png'
      icon: this.pontodescarte.tipo===0 ? '../../assets/icon/marker-vermelho.png' : '../../assets/icon/marker-verde.png'     
    });

    mapMarker.setMap(this.map);
  }

  async salvar() {
    this.pontodescarte.usuario = null;

    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.pontodescarteService
      .salvar(this.pontodescarte)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/aprovar-pontodescarte']);
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  }

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao liberar o ponto.',
      buttons: ['OK']
    });

    await alerta.present();
  }
}
