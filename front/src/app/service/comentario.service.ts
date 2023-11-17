import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../model/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  url: string = 'http://localhost:8087/api/v1/comentario';

  
  constructor(private httpClient: HttpClient) { }

  async get() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async getById(id: number) {
    let urlAuxiliar = this.url + '/' + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }
  async getByIdCategoria(id: number) {
    let urlAuxiliar = this.url + '/' + id + '/categoria';
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async save(comentario: Comentario) {
    if (comentario.idComentario === 0) {
      return await this.httpClient
        .post(this.url, JSON.stringify(comentario), this.httpHeaders)
        .toPromise();
    } else {
      return await this.httpClient
        .put(this.url, JSON.stringify(comentario), this.httpHeaders)
        .toPromise();
    }
  }


  saveDenuncia(idComentario: number, idUsuario: number){
    let denunciaList: any[] = JSON.parse(localStorage.getItem('denuncias') || '[]')
    console.log(denunciaList);
    
    denunciaList.push({'idComentario': idComentario, 'idUsuario': idUsuario})
    console.log({'idComentario': idComentario, 'idUsuario': idUsuario});
    
    localStorage.setItem('denuncias', JSON.stringify(denunciaList));
  }

  checkHasDenuncia(idComentario: number, idUsuario: number){    
    let denunciaList: any[] = JSON.parse(localStorage.getItem('denuncias') || '[]') || []
 
    if (denunciaList.length > 0) {
      let denuncia = denunciaList.find(item => item.idComentario == idComentario && item.idUsuario == idUsuario) || null

      if (denuncia !== null) {
        return true; 
      } else {
       return false; 
      }
    }

    return false;
  }



  async delete(id: number) {
    let urlAuxiliar = this.url + '/' + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }
}
