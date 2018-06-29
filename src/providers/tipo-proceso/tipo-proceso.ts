import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/server.config';


@Injectable()
export class TipoProcesoProvider {

  constructor(public http: HttpClient) {
    
  }

  cargarTiposActivos(){
    let url = URL_SERVICIOS + 'typeProcesses/activos/';
    return this.http.get(url);
  }

}

export interface Tipo{
  id?:string,
  nombre?:string,
  estado?:string
}
