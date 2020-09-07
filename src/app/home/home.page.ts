import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';

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
  markers: any = [
    {
      title: "Faculdades ESUCRI",
      latitude: "-28.6811761",
      longitude: "-49.3738259"
    },
    {
      title: "FAMCRI",
      latitude: "-28.6868546",
      longitude: "-49.3845147"
    }
  ];

  constructor(private geo: Geolocation, private platform: Platform) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.showMap();    
    })
  };

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

      this.addMarkerUserToMap(location);

      this.addMarkersToMap(this.markers);
    });
  };

  addMarkerUserToMap(location){
    let mapMarker = new google.maps.Marker({
      title: 'Sua posição',
      position: location,
      icon: 'http://maps.gstatic.com/mapfiles/markers2/boost-marker-mapview.png'
    });

    mapMarker.setMap(this.map);
      
    this.addInfoWindowToMarker(mapMarker);
  };

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        title: marker.title,
        position: position,
        icon: 'http://maps.gstatic.com/mapfiles/markers2/marker.png'
      });

      mapMarker.setMap(this.map);
      
      this.addInfoWindowToMarker(mapMarker);
    }
  };

  addInfoWindowToMarker(marker) {
    let infoWindowContent = 
    `<div class="infoitem"> 
        <h4>`+ marker.title +`</h4> 
    </div>`;

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindow();
      infoWindow.open(this.map, marker);
    });

    this.infoWindows.push(infoWindow);
  };

  closeAllInfoWindow() {
    for (let window of this.infoWindows) {
      window.close();
    };
  };
}
