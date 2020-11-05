import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PontoDescarte } from '../models/pontodescarte.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class PontoDescarteService {

  private URL = api + 'pontodescarte';
  private ONESIGNAL = 'https://onesignal.com/api/v1/notifications';

  constructor(
    private httpClient : HttpClient
  ) { };

  getPontosDescarte() {
    return this.httpClient.get<PontoDescarte[]>(this.URL);
  };

  getPontosDescarteStatus() {
    return this.httpClient.get<PontoDescarte[]>(`${this.URL+'/ByStatus'}`);
  };

  getPontoDescarte(id: number) {
    return this.httpClient.get<PontoDescarte>(`${this.URL}/${id}`);
  };

  getPontoDescarteByUsuario(usuarioId: number) {
    return this.httpClient.get<PontoDescarte[]>(`${this.URL+'/ByUsuario'}/${usuarioId}`);
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

  salvar(pontodescarte: PontoDescarte) {
    if (pontodescarte && pontodescarte.id) {
      return this.atualizar(pontodescarte);
    } else {
      return this.adicionar(pontodescarte);
    }
  };

  oneSignal(context: {}) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Basic ZjkzYTkwOTUtNTVlNy00M2NlLThkNzAtY2Q3NWI4NDRhMzQy`)
    }

    return this.httpClient.post<{}>(this.ONESIGNAL, context, header);
  }
}
