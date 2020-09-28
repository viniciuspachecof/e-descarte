import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/Item.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private URI = api + 'item';

  constructor(
    private httpClient : HttpClient
  ) { };

  getItens() {
    return this.httpClient.get<Item[]>(this.URI);
  };

  adicionar(item: Item) {
    return this.httpClient.post<Item>(this.URI, item);
  };

  atualizar(item: Item) {
    return this.httpClient.put<Item>(`${this.URI}/${item.id}`, item);
  };

  excluir(item: Item) {
    return this.httpClient.delete(`${this.URI}/${item.id}`);
  };

  getItem(id: number) {
    return this.httpClient.get<Item>(`${this.URI}/${id}`);
  };

  salvar(item: Item) {
    if (item && item.id) {
      return this.atualizar(item);
    } else {
      return this.adicionar(item);
    }
  };
}
