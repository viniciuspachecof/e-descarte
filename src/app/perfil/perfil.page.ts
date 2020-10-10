import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataSharingService } from '../services/data-sharing.service';
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
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.tokenService.logOut();    
    this.dataSharingService.isLogged.next(false);
    this.navController.navigateForward(['/login']);
  }
}
