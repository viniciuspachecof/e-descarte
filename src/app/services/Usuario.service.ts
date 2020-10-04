import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URI = api + 'usuario';
  private URI_LOGIN = api + 'login';


  constructor(
    private httpClient : HttpClient
  ) { };

  getUsuarios() {
    return this.httpClient.get<Usuario[]>(this.URI);
  };

  adicionar(usuario: Usuario) {
    return this.httpClient.post<Usuario>(this.URI, usuario);
  };

  entrar(usuario: Usuario) {
    return this.httpClient.post<Usuario>(this.URI_LOGIN, usuario);
  };

  atualizar(usuario: Usuario) {
    return this.httpClient.put<Usuario>(`${this.URI}/${usuario.id}`, usuario);
  };

  excluir(usuario: Usuario) {
    return this.httpClient.delete(`${this.URI}/${usuario.id}`);
  };

  getUsuario(id: number) {
    return this.httpClient.get<Usuario>(`${this.URI}/${id}`);
  };

  salvar(usuario: Usuario) {
    if (usuario && usuario.id) {
      return this.atualizar(usuario);
    } else {
      return this.adicionar(usuario);
    }
  };
};
