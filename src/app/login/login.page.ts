import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
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

  usuario: Usuario

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private navController: NavController,
    private tokenService: TokenService,
    private dataSharingService: DataSharingService
  ) {
    this.usuario = {
      nome: null,
      email: null,
      senha: null,
    }
  }

  ngOnInit() {
  }

  async entrar() {
    let loading = await this.loadingController.create({ message: 'Entrando' });
    loading.present();    

    this.usuarioService
      .login(this.usuario).subscribe(
        data => {
          loading.dismiss();
          this.tokenService.setToken(data);          
          this.dataSharingService.isLogged.next(true);
          this.dataSharingService.isCatador.next(this.tokenService.isCatador());
          this.navController.navigateForward(['/home']);
        }, () => {
          loading.dismiss();
          this.mensagemAlerta();
        });
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
