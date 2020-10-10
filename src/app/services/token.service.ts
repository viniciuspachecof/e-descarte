import { Injectable } from '@angular/core';
// @ts-ignore  
import jwt_decode from "jwt-decode";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(usuario): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, usuario.token);
  }

  public getToken(): string {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  getUserId(): number {
    if(this.getToken()) {
      var decoded = jwt_decode(this.getToken());            
      return parseInt(decoded.nameid);
    } 
  }
 
  isCatador(): boolean {
    if(this.getToken()) {
      var decoded = jwt_decode(this.getToken());                  
      return (decoded.role === 'CATADOR');
    }
    return false;
  }

  public logOut(): void {
    window.localStorage.clear();
  }
}
