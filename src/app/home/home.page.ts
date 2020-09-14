import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ViewChild, ElementRef } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { PontoDescarteService } from '../services/PontoDescarte.service';

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
    private loadingController: LoadingController
    ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.listar();
    })
  };

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
  };
 
  addMarkerUserToMap(location, userLat, userLong) {
    let mapMarker = new google.maps.Marker({
      title: 'Sua posição',
      position: location,
      latitude: userLat,
      longitude: userLong,
      icon: 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png'
    });

    mapMarker.setMap(this.map);

    this.addInfoWindowToMarker(mapMarker);
  };

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        title: marker.nome,
        position: position,
        latitude: marker.latitude,
        longitude: marker.longitude,
        icon: 'http://maps.gstatic.com/mapfiles/markers2/marker.png'
      });

      mapMarker.setMap(this.map);

      this.addInfoWindowToMarker(mapMarker);
    }
  };

  addInfoWindowToMarker(marker) {
    let infoWindowContent =
      `<div class="infoitem">` +
      `<h4>` + marker.title + `</h4>` +
      `<p>` + marker.longitude + `</p>` +
      `<p>` + marker.latitude + `</p>` +
      `<a href="../ponto-descarte"><ion-button id="navigate">Ver mais...</ion-button></a>` +
      `</div>`;

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindow();
      infoWindow.open(this.map, marker);

      //google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      //  document.getElementById('navigate').addEventListener('click', () => {
      //    window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.latitude + ',' + marker.longitude)
      //  })
      //})
    });

    this.infoWindows.push(infoWindow);
  };

  closeAllInfoWindow() {
    for (let window of this.infoWindows) {
      window.close();
    };
  };
}
