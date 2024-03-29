import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PontoDescarte } from '../models/PontoDescarte.interface';
import { LoadingController, AlertController, Platform, NavController } from '@ionic/angular';
import { PontoDescarteService } from '../services/ponto-descarte.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Usuario } from '../models/Usuario.interface';
import { TokenService } from '../services/token.service';
import { DataSharingService } from '../services/data-sharing.service';

declare var google: any;

@Component({
  selector: 'app-cadastrar-pontodescarte',
  templateUrl: './cadastrar-pontodescarte.page.html',
  styleUrls: ['./cadastrar-pontodescarte.page.scss'],
})
export class CadastrarPontoDescartePage implements OnInit {
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  map: any;
  infoWindows: any = [];
  mapMarkers: any = [];
  pontodescarte: PontoDescarte;
  usuarios: Usuario[];

  constructor(
    private geo: Geolocation,
    private alertController: AlertController,
    private navController: NavController,
    private loadingController: LoadingController,
    private platform: Platform,
    private pontodescarteService: PontoDescarteService,
    private tokenService: TokenService,
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
      usuario: null
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.carregarMapa();
    })
  }
 
  carregarMapa() {
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
        disableDefaultUI: true,
        clickableIcons: false
      };

      this.map = new google.maps.Map(this.mapRef.nativeElement, options);

      this.addMarkerUserToMap(location, userLat, userLong);

      this.map.addListener('click', (e) => {
        this.onClickMap(e.latLng.lat(), e.latLng.lng());
      });
    });
  }

  addMarkerUserToMap(location, userLat, userLong) {
    let mapMarker = new google.maps.Marker({
      title: 'Sua posição',
      position: location,
      latitude: userLat,
      longitude: userLong,
      // icon: 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png'
      icon: '../../assets/icon/marker-azul.png'      
    });

    mapMarker.setMap(this.map);

    this.addInfoWindowToMarker(mapMarker);
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent =
      `<div class="infoitem">` +
      `<h4>` + marker.title + `</h4>` +
      `<p>` + marker.longitude + `</p>` +
      `<p>` + marker.latitude + `</p>`;


    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindow();
      infoWindow.open(this.map, marker);
    });

    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindow() {
    for (let window of this.infoWindows) {
      window.close();
    };
  }

  onClickMap(lat, long) {
    this.clearMarkers();

    const location = new google.maps.LatLng(lat, long);

    let mapMarker = new google.maps.Marker({
      position: location,
      latitude: lat,
      longitude: long,
      // icon: 'http://maps.gstatic.com/mapfiles/markers2/marker.png'
      icon: this.tokenService.isCatador() ? '../../assets/icon/marker-vermelho.png' : '../../assets/icon/marker-verde.png'
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
      this.alertMessageLatLong();
      return;
    }

    this.pontodescarte.usuario = null;
    this.pontodescarte.usuarioId = this.tokenService.getUserId();
    this.pontodescarte.tipo = this.tokenService.isCatador() ? 0 : 1;

    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.pontodescarteService
      .salvar(this.pontodescarte)
      .subscribe(() => {
        loading.dismiss();
        this.dataSharingService.selectedIndex.next(1);
        this.limparCampos();
        this.alertMessageConfirmPonto();
        this.navController.navigateForward(['/home']);
      }, () => {
        loading.dismiss();
        this.alertMessage();
      });
  }

  limparCampos() {
    this.pontodescarte = {
      nome: null,
      fone: null,
      latitude: null,
      longitude: null,
      ativo: true,
      status: false,
      tipo: null,
      usuarioId: null,
      usuario: null
    }
  }

  async alertMessageLatLong() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Aviso',
      message: 'Informe ao mapa o local de descarte.',
      buttons: ['OK']
    });

    await alerta.present();
  }

  async alertMessageConfirmPonto() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Aviso',
      message: 'Seu ponto estará liberado assim que possível, após uma avaliação de nossa equipe.',
      buttons: ['OK']
    });

    await alerta.present();
  }

  async alertMessage() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Aviso',
      message: 'Erro ao fazer o cadastro.',
      buttons: ['OK']
    });

    await alerta.present();
  }
}
