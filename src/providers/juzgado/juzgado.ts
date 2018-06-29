import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/server.config';


@Injectable()
export class JuzgadoProvider {

  constructor(public http: HttpClient) { }

  cargarJuzgadoActivos(){
    let url = URL_SERVICIOS + 'court/activos/';
    return this.http.get(url);
  }

}

export interface Juzgado{
  id?:string,
  nombre?:string,
  estado?:string
}
