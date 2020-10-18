import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public isCatador: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.tokenService.isCatador());
  public displayMenu: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.tokenService.getToken() != null);
  public selectedIndex: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(
    private tokenService: TokenService
  ) { }
}
