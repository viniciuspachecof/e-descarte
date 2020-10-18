import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cidade } from '../models/cidade.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private URL = api + 'cidade';

  constructor(
    private httpClient : HttpClient
  ) { };

  getCidades() {
    return this.httpClient.get<Cidade[]>(this.URL);
  };

  adicionar(cidade: Cidade) {
    return this.httpClient.post<Cidade>(this.URL, cidade);
  };

  atualizar(cidade: Cidade) {
    return this.httpClient.put<Cidade>(`${this.URL}/${cidade.id}`, cidade);
  };

  excluir(cidade: Cidade) {
    return this.httpClient.delete(`${this.URL}/${cidade.id}`);
  };

  getCidade(id: number) {
    return this.httpClient.get<Cidade>(`${this.URL}/${id}`);
  };

  salvar(cidade: Cidade) {
    if (cidade && cidade.id) {
      return this.atualizar(cidade);
    } else {
      return this.adicionar(cidade);
    }
  };
}
