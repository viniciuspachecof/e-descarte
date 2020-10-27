import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PontoDescarteItem } from '../models/pontodescarteitem.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class PontoDescarteItemService {

  private URL = api + 'pontodescarteitem';

  constructor(
    private httpClient : HttpClient
  ) { };

  getPontoDescarteItens() {
    return this.httpClient.get<PontoDescarteItem[]>(this.URL);
  };

  adicionar(pontodescarteitem: PontoDescarteItem) {
    return this.httpClient.post<PontoDescarteItem>(this.URL, pontodescarteitem);
  };

  atualizar(pontodescarteitem: PontoDescarteItem) {
    return this.httpClient.put<PontoDescarteItem>(`${this.URL}/${pontodescarteitem.id}`, pontodescarteitem);
  };

  excluir(pontodescarteitem: PontoDescarteItem) {
    return this.httpClient.delete(`${this.URL}/${pontodescarteitem.id}`);
  };

  getPontoDescarteItem(id: number) {
    return this.httpClient.get<PontoDescarteItem>(`${this.URL}/${id}`);
  };

  getPontoDescarteItemByPontoDescarte(pontodescarteId: number) {
    return this.httpClient.get<PontoDescarteItem[]>(`${this.URL+'/ByPontoDescarte'}/${pontodescarteId}`);
  };

  getPontoDescarteItemByPontoDescarteUsuario(pontodescarteId: number, usuarioId: number) {
    return this.httpClient.get<PontoDescarteItem[]>(`${this.URL+'/ByPontoDescarteUsuario'}/${pontodescarteId}/${usuarioId}`);
  };

  getPontoDescarteItemByPontoDescarteUsuarioNome(pontodescarteId: number, usuarioNome: string) {
    return this.httpClient.get<PontoDescarteItem[]>(`${this.URL+'/ByPontoDescarteUsuarioNome'}/${pontodescarteId}/${usuarioNome}`);
  };

  getPontoDescarteItemByUsuarioTotalPonto(usuarioId: number) {
    return this.httpClient.get<number>(`${this.URL+'/ByUsuarioTotalPonto'}/${usuarioId}`);
  };

  salvar(pontodescarteitem: PontoDescarteItem) {
    if (pontodescarteitem && pontodescarteitem.id) {
      return this.atualizar(pontodescarteitem);
    } else {
      return this.adicionar(pontodescarteitem);
    }
  };
}
