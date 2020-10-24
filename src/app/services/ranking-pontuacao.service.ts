import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RankingPontuacao } from '../models/rankingpontuacao.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class RankingPontuacaoService {
  private URL = api + 'rankingpontuacao';

  constructor(
    private httpClient : HttpClient
  ) { };

  getRankingPontuacoes() {
    return this.httpClient.get<RankingPontuacao[]>(this.URL);
  };

  adicionar(rankingpontuacao: RankingPontuacao) {
    return this.httpClient.post<RankingPontuacao>(this.URL, rankingpontuacao);
  };

  atualizar(rankingpontuacao: RankingPontuacao) {
    return this.httpClient.put<RankingPontuacao>(`${this.URL}/${rankingpontuacao.id}`, rankingpontuacao);
  };

  excluir(rankingpontuacao: RankingPontuacao) {
    return this.httpClient.delete(`${this.URL}/${rankingpontuacao.id}`);
  };

  getRankingPontuacao(id: number) {
    return this.httpClient.get<RankingPontuacao>(`${this.URL}/${id}`);
  };

  getRankingPontuacaoByUsuario(usuarioId: number) {
    return this.httpClient.get<RankingPontuacao>(`${this.URL+'/ByUsuario'}/${usuarioId}`);
  };

  salvar(rankingpontuacao: RankingPontuacao) {
    if (rankingpontuacao && rankingpontuacao.id) {
      return this.atualizar(rankingpontuacao);
    } else {
      return this.adicionar(rankingpontuacao);
    }
  };
}
