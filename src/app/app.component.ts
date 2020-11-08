import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { NavController, Platform, AlertController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TokenService } from './services/token.service';
import { DataSharingService } from './services/data-sharing.service';

import { OneSignal } from "@ionic-native/onesignal/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

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
    private navController: NavController,
    private onesignal: OneSignal,
    private alertCtrl: AlertController
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
      this.setupPush();

    });
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `OK`,
          handler: () => { }
        }
      ]
    })
    alert.present();
  }

  setupPush() {
    this.onesignal.startInit('f5d4c64d-e936-4b93-bc89-f5340f80ccc1', '1050446780632');

    this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.None);

    this.onesignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    // this.onesignal.handleNotificationOpened().subscribe(data => {
    //   let additionalData = data.notification.payload.additionalData;
    //   this.showAlert('Notification opened', 'you already read this before', additionalData.task);
    // });

    this.onesignal.endInit();
  }

  ngOnInit() { }

  logOut() {
    this.tokenService.logOut();
    this.dataSharingService.displayMenu.next(false);
    this.navController.navigateForward(['/login']);
  }
}
