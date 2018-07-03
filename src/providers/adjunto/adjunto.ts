import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/server.config';

declare var swal: any;

@Injectable()
export class AdjuntoProvider {

  adjuntos = [];

  constructor(public http: HttpClient) {}

  crearAlerta(adjunto: Adjunto){

    console.log(adjunto);
    
    let url = URL_SERVICIOS + 'adjuntos/create';
    return this.http.post(url, {'proceso_id': adjunto.proceso_id, 'descripcion': adjunto.descripcion, 'archivo': adjunto.archivo})
                .map((resp:any)=>{
                  this.adjuntos.push(resp.adjunto);
                  return resp;
                });
  }

  cargarAdjuntosPorProceso(proceso_id:string){
    this.adjuntos = [];
    let url = URL_SERVICIOS + 'adjuntos/allAdjuntos/'+proceso_id;
    return this.http.get(url).map((resp:any)=>{
      if(resp.error){
        return resp;
      }else{
        for(var i=0; i<resp.adjuntos.length ; i++){
          this.adjuntos.push(resp.adjuntos[i]);
        }
        return resp;
      }
    }, error =>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
    });
  }

}

export interface Adjunto{
  id?:string,
  proceso_id?:string,
  descripcion?:string,
  archivo?:string,
}
