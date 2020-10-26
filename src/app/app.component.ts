import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TokenService } from './services/token.service';
import { DataSharingService } from './services/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  displayMenu: boolean;
  isCatador: boolean;
  isAdmin: boolean;
  selectedIndex: number;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,   
    private dataSharingService: DataSharingService,
    private tokenService: TokenService,
    private navController: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.dataSharingService.displayMenu.subscribe(value => {
        this.displayMenu = value;
      });
      this.dataSharingService.isCatador.subscribe(value => {
        this.isCatador = value;
      });
      this.dataSharingService.isAdmin.subscribe(value => {
        this.isAdmin = value;
      });
      this.dataSharingService.selectedIndex.subscribe(value => {
        this.selectedIndex = value;
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() { }  

  logOut() {
    this.tokenService.logOut();    
    this.dataSharingService.displayMenu.next(false);
    this.navController.navigateForward(['/login']);
  }
}
