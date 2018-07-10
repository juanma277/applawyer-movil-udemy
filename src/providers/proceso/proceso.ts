import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/server.config';

declare var swal: any;

@Injectable()
export class ProcesoProvider {

  procesos = [];
  cantidadProcesos:number = 0; 

  constructor(public http: HttpClient) { }

  cargarProcesos(user_id:string){
    this.procesos = [];
    this.cantidadProcesos = 0;
    let url = URL_SERVICIOS + '/processes/getProcessesUser/'+user_id;
    return this.http.get(url).map((resp:any)=>{
      if(resp.error){
        swal("Advertencia", "No tienes registrados procesos!", "warning");
        return resp;
      }else{
        for(var i=0; i<resp.process.length ; i++){
          this.procesos.push(resp.process[i]);
        }
        this.cantidadProcesos = this.procesos.length;
        return resp;
      }
    }, error =>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
    });
  }

  crearProceso(proceso:Proceso){
    let url = URL_SERVICIOS + 'processes/create';
    return this.http.post(url, {'tipo_proceso': proceso.tipo_proceso_id, 'user':proceso.user_id, 'juzgado': proceso.juzgado_id, 'demandante':proceso.demandante, 'demandado':proceso.demandado, 'radicado':proceso.radicado, 'fecha':proceso.fecha});
  }

  eliminarProceso(proceso_id:string, user_id:string){
    this.procesos = [];
    this.cantidadProcesos = 0;
    let url = URL_SERVICIOS + 'processes/delete/' + proceso_id +'/' + user_id ;

    return this.http.delete(url).map((resp:any)=>{
      return resp;
    }, error =>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");      
    });
  }

  obtenerProceso(proceso_id:string){
    let url = URL_SERVICIOS + 'processes/getProcesses/'+proceso_id;
    return this.http.get(url).map((resp:any)=>{
      if(resp.error){
        swal("Advertencia", "El proceso no tiene actuaciones registradas!", "warning");
        return resp;
      }else{
        return resp;
      }
    }, error =>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
    });    
  }

  procesosPorJuzgado(user_id:string){
    let url = URL_SERVICIOS +'processes/porJuzgado/'+user_id;
    return this.http.get(url).map((resp:any)=>{
      return resp;
    });
  }

  procesosPorTipo(user_id:string){
    let url = URL_SERVICIOS +'processes/porTipo/'+user_id;
    return this.http.get(url).map((resp:any)=>{
      return resp;
    });
  }

  procesosPorCiudad(user_id:string){
    let url = URL_SERVICIOS +'processes/porCiudad/'+user_id;
    return this.http.get(url).map((resp:any)=>{
      return resp;
    });
  }

  procesosPorEstado(user_id:string){
    let url = URL_SERVICIOS +'processes/porEstado/'+user_id;
    return this.http.get(url).map((resp:any)=>{
      return resp;
    });
  }
  
}

export interface Proceso{
  id?:string,
  tipo_proceso_id?:string,
  user_id?:string,
  juzgado_id?:string,
  demandante?:string,
  demandado?:string,
  radicado?:string,
  fecha?:Date
  estado?:string
}
