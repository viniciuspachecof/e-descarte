import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DataSharingService } from './services/data-sharing.service';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';

import { OneSignal } from '@ionic-native/onesignal/ngx';

//import { Camera } from "@ionic-native/camera/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    NgxMaskIonicModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //Camera,
    Geolocation,
    DataSharingService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
