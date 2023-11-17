import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  url: string = 'http://localhost:8087/api/v1/categoria';

  
  constructor(private httpClient: HttpClient) { }

  async get() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async getById(id: number) {
    let urlAuxiliar = this.url + '/' + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }
  async getByNome(nome: string) {
    let urlAuxiliar = this.url + '/' + nome;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async save(categoria: Categoria) {
    if (categoria.id === 0) {
      return await this.httpClient
        .post(this.url, JSON.stringify(categoria), this.httpHeaders)
        .toPromise();
    } else {
      return await this.httpClient
        .put(this.url, JSON.stringify(categoria), this.httpHeaders)
        .toPromise();
    }
  }

  async delete(id: number) {
    let urlAuxiliar = this.url + '/' + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }
}
