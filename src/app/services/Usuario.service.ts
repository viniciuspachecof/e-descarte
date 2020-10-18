import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = api + 'usuario';
  private URL_LOGIN = api + 'login';

  constructor(
    private httpClient : HttpClient
  ) { };

  login(usuario: Usuario) {
    return this.httpClient.post<Usuario>(this.URL_LOGIN, usuario);
  };

  getUsuarios() {
    return this.httpClient.get<Usuario[]>(this.URL);
  };

  adicionar(usuario: Usuario) {
    return this.httpClient.post<Usuario>(this.URL, usuario);
  };

  atualizar(usuario: Usuario) {
    return this.httpClient.put<Usuario>(`${this.URL}/${usuario.id}`, usuario);
  };

  excluir(usuario: Usuario) {
    return this.httpClient.delete(`${this.URL}/${usuario.id}`);
  };

  getUsuario(id: number) {
    return this.httpClient.get<Usuario>(`${this.URL}/${id}`);
  };

  salvar(usuario: Usuario) {
    if (usuario && usuario.id) {
      return this.atualizar(usuario);
    } else {
      return this.adicionar(usuario);
    }
  }
}
