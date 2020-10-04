import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/models/Usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {

  usuario: Usuario;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private navController: NavController,
  ) {
    this.usuario = {
      nome: null,
      email: null,
      senha: null,    
    }
   }

  ngOnInit() {
  }

  async salvar() {
    let dto = {
        id: this.usuario.id,
        nome: this.usuario.nome,
        email: this.usuario.email,
        senha: this.usuario.senha,
      };

    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.usuarioService
      .salvar(dto)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/login']);
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  }

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao criar conta.',
      buttons: ['OK']
    });
  }
}
