import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private tokenService: TokenService,
    private navController: NavController,
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.tokenService.logOut();    
    this.navController.navigateForward(['/login']);
  }
}
