import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PontoDescarteItem } from '../models/pontodescarteitem.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class PontoDescarteItemService {

  private URI = api + 'pontodescarteitem';

  constructor(
    private httpClient : HttpClient
  ) { };

  getPontoDescarteItens() {
    return this.httpClient.get<PontoDescarteItem[]>(this.URI);
  };

  adicionar(pontodescarteitem: PontoDescarteItem) {
    return this.httpClient.post<PontoDescarteItem>(this.URI, pontodescarteitem);
  };

  atualizar(pontodescarteitem: PontoDescarteItem) {
    return this.httpClient.put<PontoDescarteItem>(`${this.URI}/${pontodescarteitem.id}`, pontodescarteitem);
  };

  excluir(pontodescarteitem: PontoDescarteItem) {
    return this.httpClient.delete(`${this.URI}/${pontodescarteitem.id}`);
  };

  getPontoDescarteItem(id: number) {
    return this.httpClient.get<PontoDescarteItem>(`${this.URI}/${id}`);
  };

  getPontoDescarteItemByPontoDescarte(pontodescarteId: number, usuarioId: number) {
    return this.httpClient.get<PontoDescarteItem[]>(`${this.URI+'/ByPontoDescarte'}/${pontodescarteId}/${usuarioId}`);
  };

  salvar(pontodescarteitem: PontoDescarteItem) {
    if (pontodescarteitem && pontodescarteitem.id) {
      return this.atualizar(pontodescarteitem);
    } else {
      return this.adicionar(pontodescarteitem);
    }
  };
};
