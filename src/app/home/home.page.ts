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
        disableDefaultUI: true,
        clickableIcons: false
      };      

      this.map = new google.maps.Map(this.mapRef.nativeElement, options);

      this.addMarkerUserToMap(location, userLat, userLong);

      this.addMarkersToMap(this.markers);

      const legendsIcons: Record<string, any> = {
        suaposicao: {
          name: "Minha posição",
          icon: '../../assets/icon/marker-azul.png',
        },
        pontosprivados: {
          name: "Pontos privados",
          icon: '../../assets/icon/marker-vermelho.png',
        },
        pontospublicos: {
          name: "Pontos públicos",
          icon: '../../assets/icon/marker-verde.png',
        }               
      };

      this.addLegendsToMap(legendsIcons);

      this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('legend'));
    });
  }

  addMarkerUserToMap(location, userLat, userLong) {
    let mapMarker = new google.maps.Marker({
      title: 'Minha posição',
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
      if (marker.ativo && marker.status) {
        let position = new google.maps.LatLng(marker.latitude, marker.longitude);
        let mapMarker = new google.maps.Marker({
          id: marker.id, // Adicionando o id para o rastreamento do ponto
          title: marker.nome,
          position: position,
          latitude: marker.latitude,
          longitude: marker.longitude,
          // icon: 'http://maps.gstatic.com/mapfiles/markers2/marker.png'
          icon: marker.tipo===0 ? '../../assets/icon/marker-vermelho.png' : '../../assets/icon/marker-verde.png'
        });

        mapMarker.setMap(this.map);

        this.addInfoWindowToMarker(mapMarker);
      }
    }
  }

  addLegendsToMap(legendsIcons) {
    const legend = document.getElementById("legend") as HTMLElement;

    for (const key in legendsIcons) {
      const type = legendsIcons[key];
      const name = type.name;
      const icon = type.icon;
      const div = document.createElement("div");
      div.innerHTML = '<img src="' + icon + '"> ' + name;
      legend.appendChild(div);
    }
  }

  addUserInfoWindowToMarker(marker) {
    let infoWindowContent =
      `<div class="infoitem" style="text-align: center">` +
      `<h4 style="color: #696969">` + marker.title + `</h4>`;

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
      `<div class="infoitem" style="text-align: center">` +
      `<h4 style="color: #696969">` + marker.title + `</h4>` +
      `<ion-button id="information" fill="clear">Ver mais...</ion-button>` +
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
