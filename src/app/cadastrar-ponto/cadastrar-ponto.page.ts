import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PontoDescarte } from '../models/PontoDescarte.interface';
import { LoadingController, AlertController, Platform, NavController } from '@ionic/angular';
import { PontoDescarteService } from '../services/PontoDescarte.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-cadastrar-ponto',
  templateUrl: './cadastrar-ponto.page.html',
  styleUrls: ['./cadastrar-ponto.page.scss'],
})
export class CadastrarPontoPage implements OnInit {
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  map: any;
  mapMarkers: any = [];
  pontodescarte: PontoDescarte;

  constructor(
    private geo: Geolocation,
    private alertController: AlertController,
    private navController: NavController,
    private loadingController: LoadingController,
    private platform: Platform,
    private pontodescarteService: PontoDescarteService
  ) {
    this.pontodescarte = {
      nome: null,
      fone: null,
      latitude: null,
      longitude: null
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.listar();
    })
  };

  listar() {
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then(res => {
      let userLat = res.coords.latitude;
      let userLong = res.coords.longitude;

      const location = new google.maps.LatLng(userLat, userLong);
      const options = {
        center: location,
        zoom: 15,
        disableDefaultUI: true
      };

      this.map = new google.maps.Map(this.mapRef.nativeElement, options);

      this.map.addListener('click', (e) => {
        this.onClickMap(e.latLng.lat(), e.latLng.lng());
      });
    });
  };

  onClickMap(lat, long) {
    this.clearMarkers();

    const location = new google.maps.LatLng(lat, long);

    let mapMarker = new google.maps.Marker({
      position: location,
      latitude: lat,
      longitude: long,
      icon: 'http://maps.gstatic.com/mapfiles/markers2/marker.png'
    });

    mapMarker.setMap(this.map);

    this.mapMarkers.push(mapMarker);

    this.pontodescarte.latitude = lat;
    this.pontodescarte.longitude = long;    
  }

  clearMarkers() {
    for (let i = 0; i < this.mapMarkers.length; i++) {
      this.mapMarkers[i].setMap(null);
    }
  }

async salvar() {
  if (!this.pontodescarte.latitude || !this.pontodescarte.longitude) {
    this.alertMessage();
    return;
  }

  let loading = await this.loadingController.create({ message: 'Salvando' });
  loading.present();

  this.pontodescarteService
    .salvar(this.pontodescarte)
    .subscribe(() => {
      loading.dismiss();
      this.navController.navigateForward(['/home']);
    }, () => {
      loading.dismiss();
      this.alertMessage();
    });
}

async alertMessage() {
  const alerta = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Aviso',
    message: 'Informe ao mapa o local de descarte.',
    buttons: ['OK']
  });

  await alerta.present();
};
  
}
