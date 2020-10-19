import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ViewChild, ElementRef } from '@angular/core';
import { Platform, LoadingController, NavController } from '@ionic/angular';
import { PontoDescarteService } from '../services/ponto-descarte.service';
import { DataSharingService } from '../services/data-sharing.service';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  map: any;
  infoWindows: any = [];
  markers: any = [];

  constructor(
    private geo: Geolocation,
    private platform: Platform,
    private pontodescarteService: PontoDescarteService,
    private loadingController: LoadingController,
    private navController: NavController,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.dataSharingService.displayMenu.next(true);
    this.platform.ready().then(() => {
      this.listar();
    })
  }

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });

    loading.present();

    this.pontodescarteService.getPontosDescarte().subscribe((data) => {
      this.markers = data;
      loading.dismiss();

      this.showMap();
    });
  }

  showMap() {
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then(res => {
      let userLat = res.coords.latitude;
      let userLong = res.coords.longitude;

      const location = new google.maps.LatLng(userLat, userLong);
      const options = {
        center: location,
        zoom: 13,
        disableDefaultUI: true
      };

      this.map = new google.maps.Map(this.mapRef.nativeElement, options);

      this.addMarkerUserToMap(location, userLat, userLong);

      this.addMarkersToMap(this.markers);
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

    this.addUserInfoWindowToMarker(mapMarker);
  }
  
  addMarkersToMap(markers) {
    for (let marker of markers) {
      if (marker.status) {
        let position = new google.maps.LatLng(marker.latitude, marker.longitude);
        let mapMarker = new google.maps.Marker({
          id: marker.id, // Adicionando o id para o rastreamento do ponto
          title: marker.nome,
          position: position,
          latitude: marker.latitude,
          longitude: marker.longitude,
          // icon: 'http://maps.gstatic.com/mapfiles/markers2/marker.png'
          icon: '../../assets/icon/marker-vermelho.png'
        });

        mapMarker.setMap(this.map);

        this.addInfoWindowToMarker(mapMarker);
      }
    }
  }

  addUserInfoWindowToMarker(marker) {
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

  addInfoWindowToMarker(marker) {
    let infoWindowContent =
      `<div class="infoitem">` +
      `<h4>` + marker.title + `</h4>` +
      `<p>` + marker.longitude + `</p>` +
      `<p>` + marker.latitude + `</p>` +
      `<ion-button id="information">Ver mais...</ion-button>` +
      `</div>`;

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindow();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('information').addEventListener('click', () => {
          this.navController.navigateForward(['/home', 'visualizar', marker.id]);
        })
      })
    });

    this.infoWindows.push(infoWindow);
  }

  onClickButton() {
    console.log('teste')
  }

  closeAllInfoWindow() {
    for (let window of this.infoWindows) {
      window.close();
    };
  }
}
