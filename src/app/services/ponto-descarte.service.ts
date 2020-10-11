import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PontoDescarte } from '../models/pontodescarte.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class PontoDescarteService {

  private URL = api + 'pontodescarte';

  constructor(
    private httpClient : HttpClient
  ) { };

  getPontosDescarte() {
    return this.httpClient.get<PontoDescarte[]>(this.URL);
  };

  adicionar(pontodescarte: PontoDescarte) {
    return this.httpClient.post<PontoDescarte>(this.URL, pontodescarte);
  };

  atualizar(pontodescarte: PontoDescarte) {
    return this.httpClient.put<PontoDescarte>(`${this.URL}/${pontodescarte.id}`, pontodescarte);
  };

  excluir(pontodescarte: PontoDescarte) {
    return this.httpClient.delete(`${this.URL}/${pontodescarte.id}`);
  };

  getPontoDescarte(id: number) {
    return this.httpClient.get<PontoDescarte>(`${this.URL}/${id}`);
  };

  salvar(pontodescarte: PontoDescarte) {
    if (pontodescarte && pontodescarte.id) {
      return this.atualizar(pontodescarte);
    } else {
      return this.adicionar(pontodescarte);
    }
  };
}
