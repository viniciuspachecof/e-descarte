import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/models/Usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RankingPontuacao } from '../models/rankingpontuacao.interface';
import { RankingPontuacaoService } from '../services/ranking-pontuacao.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {

  usuario: Usuario;
  rankingpontuacao: RankingPontuacao;
  confirmSenha: string;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private usuarioService: UsuarioService,
    private rankingpontuacaoService: RankingPontuacaoService,
    private navController: NavController,
  ) {
    this.usuario = {
      nome: null,
      email: null,
      fone: null,
      senha: null,
      tipo: 'DESCARTANTE'
    }
  }

  ngOnInit() {
  }

  async salvar() {
    if (this.usuario.senha !== this.confirmSenha) {
      this.alertMessageConfirmSenha();
      return;
    }

    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.usuarioService
      .salvar(this.usuario)
      .subscribe((context) => {
        loading.dismiss();
        this.carregarRankingPontuacao(context);
        this.navController.navigateForward(['/login']);
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  }

  carregarRankingPontuacao(context) {
    this.rankingpontuacaoService.getRankingPontuacaoByUsuario(context.id).subscribe((data) => {
      this.rankingpontuacao = data;

      this.salvarRankingPontuacao(context);
    });
  }

  async salvarRankingPontuacao(context) {
    if (this.rankingpontuacao) return;

    this.rankingpontuacao = {
      pontuacao: 0,
      nivel: 0,
      usuarioId: context.id,
      usuario: null,
    }

    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.rankingpontuacaoService
      .salvar(this.rankingpontuacao)
      .subscribe(() => {
        this.limparCampos();
        loading.dismiss();
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
  }

  limparCampos() {
    this.usuario = {
      nome: null,
      email: null,
      fone: null,
      senha: null,
      tipo: 'DESCARTANTE'
    }

    this.confirmSenha = null;
  }

  async alertMessageConfirmSenha() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Aviso',
      message: 'As senhas não coincidem.',
      buttons: ['OK']
    });

    await alerta.present();
  }

  async mensagemAlerta() {
    const alerta = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Erro ao criar a conta.',
      buttons: ['OK']
    });

    await alerta.present();
  }
}
