import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, Platform, IonRouterOutlet } from '@ionic/angular';
import { Usuario } from '../models/Usuario.interface';
import { DataSharingService } from '../services/data-sharing.service';
import { TokenService } from '../services/token.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  subscribe: any; 
  
  usuario: Usuario

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private navController: NavController,
    private tokenService: TokenService,
    private dataSharingService: DataSharingService,
    private platform: Platform,
    private alertCtrl: AlertController,
  ) {
    this.usuario = {
      nome: null,
      email: null,
      fone: null,
      senha: null,
      tipo: null,
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.subscribe = this.platform.backButton.subscribeWithPriority(0, () => {
      this.presentAlertConfirm();
    });
  }

  ionViewWillLeave() {
    this.subscribe.unsubscribe();
  }

  async entrar() {
    let loading = await this.loadingController.create({ message: 'Entrando' });
    loading.present();

    this.usuarioService
      .login(this.usuario).subscribe(
        data => {
          loading.dismiss();
          this.tokenService.setToken(data);
          this.dataSharingService.displayMenu.next(true);
          this.dataSharingService.isCatador.next(this.tokenService.isCatador());
          this.dataSharingService.isAdmin.next(this.tokenService.isAdmin());
          this.dataSharingService.selectedIndex.next(1);
          this.navController.navigateForward(['/home']);
        }, () => {
          loading.dismiss();
          this.mensagemAlerta();
        });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirme',
      message: 'Deseja realmente sair do App ?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => { }
      }, {
        text: 'Fechar App',
        handler: () => {
          navigator['myApp'].exitApp();
        }
      }]
    });
    await alert.present();
  }

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Email ou senha inválido.',
      buttons: ['OK']
    });

    await alerta.present();
  }
}
