import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { RankingPontuacao } from '../models/rankingpontuacao.interface';
import { Usuario } from '../models/Usuario.interface';
import { DataSharingService } from '../services/data-sharing.service';
import { RankingPontuacaoService } from '../services/ranking-pontuacao.service';
import { TokenService } from '../services/token.service';
import { UsuarioService } from '../services/usuario.service';
import { Camera } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  imgURL;
  usuario: Usuario;
  rankingpontuacao: RankingPontuacao;

  constructor(
    private camera:Camera,
    private tokenService: TokenService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navController: NavController,
    private usuarioService: UsuarioService,
    private rankingpontuacaoService: RankingPontuacaoService,
    private dataSharingService: DataSharingService
  ) {
    this.usuario = {
      nome: null,
      email: null,
      fone: null,
      senha: null,
      tipo:null,
    },
    this.rankingpontuacao = {
      pontuacao: null,
      usuarioId: null,
      usuario: null
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.usuarioService.getUsuario(this.tokenService.getUserId()).subscribe((data) => {
      this.usuario = data;
      this.usuario.senha = null;

      this.carregarRankingPontuacao();
    });
  }

  async salvar() {
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.usuarioService
      .salvar(this.usuario)
      .subscribe(() => {
        loading.dismiss();    
        this.mensagemSucesso();   
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  }

  carregarRankingPontuacao() {
    this.rankingpontuacaoService.getRankingPontuacaoByUsuario(this.usuario.id).subscribe((data) => {
      this.rankingpontuacao = data;    
    });
  }

  async mensagemSucesso() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Perfil alterado com sucesso.',
      buttons: ['OK']
    });

    await alerta.present();
  }

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao editar o perfil.',
      buttons: ['OK']
    });

    await alerta.present();
  }

  logOut() {
    this.tokenService.logOut();
    this.dataSharingService.displayMenu.next(false);
    this.navController.navigateForward(['/login']);
  }

  getCamera(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI
    }).then( (res)=>{
      this.imgURL = res;
    }).catch(e =>{
      console.log(e);
    })
  }

  getGaleria(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then( (res)=>{
      this.imgURL = 'data:image/jpeg;base64,' + res;
    }).catch(e =>{
      console.log(e);
    })
  }
}
