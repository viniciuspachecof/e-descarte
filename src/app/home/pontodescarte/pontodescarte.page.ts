import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PontoDescarte } from 'src/app/models/pontodescarte.interface';
import { Usuario } from 'src/app/models/Usuario.interface';
import { PontoDescarteService } from 'src/app/services/PontoDescarte.service';
import { UsuarioService } from 'src/app/services/Usuario.service';

@Component({
  selector: 'app-pontodescarte',
  templateUrl: './pontodescarte.page.html',
  styleUrls: ['./pontodescarte.page.scss'],
})
export class PontodescartePage implements OnInit {

  pontodescarte: PontoDescarte;
  usuarios: Usuario[];
  usuarioId: null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private pontodescarteService: PontoDescarteService,
    private usuarioService: UsuarioService
  ) {
    this.pontodescarte = {
      nome: null,
      fone: null,
      latitude: null,
      longitude: null,
      // usuario: []
    }
  }

  // async ngOnInit() {
  //   const id = this.activatedRoute.snapshot.params['id'];
  //   const loading = await this.loadingController.create({ message: 'Carregando' });
  //   loading.present();
  //   this.pontodescarteService.getPontoDescarte(id).subscribe((pontodescarte) => {
  //     this.pontodescarte = pontodescarte;      
  //     loading.dismiss();
  //   });
  // }

  async ngOnInit() {
    this.listarUsuarios();
  }

  async listarUsuarios() {
    const loading = await this.loadingController.create({ message: 'Carregando' });
    loading.present();

    this.usuarioService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.carregarPontoDescate();
      loading.dismiss();
    });
  }

  carregarPontoDescate() {
    const id = this.activatedRoute.snapshot.params['id'];    
    this.pontodescarteService.getPontoDescarte(id).subscribe((pontodescarte) => {
      this.pontodescarte = pontodescarte;           
    });
  }

  navigate() {
    window.open('https://www.google.com/maps/dir/?api=1&destination=' + this.pontodescarte.latitude + ',' + this.pontodescarte.longitude)
  }
}
