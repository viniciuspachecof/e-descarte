import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/Item.interface';
import { api } from './api';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private URL = api + 'item';

  constructor(
    private httpClient : HttpClient
  ) { };

  getItens() {
    return this.httpClient.get<Item[]>(this.URL);
  };

  adicionar(item: Item) {
    return this.httpClient.post<Item>(this.URL, item);
  };

  atualizar(item: Item) {
    return this.httpClient.put<Item>(`${this.URL}/${item.id}`, item);
  };

  excluir(item: Item) {
    return this.httpClient.delete(`${this.URL}/${item.id}`);
  };

  getItem(id: number) {
    return this.httpClient.get<Item>(`${this.URL}/${id}`);
  };

  salvar(item: Item) {
    if (item && item.id) {
      return this.atualizar(item);
    } else {
      return this.adicionar(item);
    }
  };
}
