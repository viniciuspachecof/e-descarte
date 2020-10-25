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
      senha: null,
      tipo: 'DESCARTANTE',
    }
  }

  ngOnInit() {

  }

  async salvar() {
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
      usuarioId: context.id,
      usuario: null,
    }

    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.rankingpontuacaoService
      .salvar(this.rankingpontuacao)
      .subscribe(() => {
        loading.dismiss();
      }, () => {
        loading.dismiss();
        this.mensagemAlerta();
      });
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
