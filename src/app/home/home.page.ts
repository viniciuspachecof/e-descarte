import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  map: any;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  infoWindows: any = [];
  markers: any = [
    {
      title: "Faculdades ESUCRI",
      latitude: "-28.681298",
      longitude: "-49.3748468"
    },
    {
      title: "FAMCRI",
      latitude: "-28.686798",
      longitude: "-49.3849732"
    }
  ];

  // lat;
  // lng;

  constructor(private geo: Geolocation) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.showMap();
  };

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  };

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">'
      + '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
      '<p>Latitude: ' + marker.latitude + '</p>' +
      '<p>Longitude: ' + marker.longitude + '</p>' + '</div>';

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
    }
  };

  showMap() {
    const location = new google.maps.LatLng(-28.681246, -49.3813287);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  };

  // ondeTo() {
  //   this.geo.getCurrentPosition({
  //     timeout: 10000,
  //     enableHighAccuracy: true
  //   }).then((res) => {
  //     this.lat = res.coords.latitude;
  //     this.lng = res.coords.longitude;
  //   }).catch((e) => {
  //     console.log(e);
  //   })
  // }
}
