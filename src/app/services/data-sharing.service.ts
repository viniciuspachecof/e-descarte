import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.tokenService.getToken() != null);
  public isCatador: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.tokenService.isCatador());

  constructor(
    private tokenService: TokenService
  ) { }
}
