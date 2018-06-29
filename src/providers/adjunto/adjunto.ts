import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AdjuntoProvider {

  constructor(public http: HttpClient) {
    
  }

}

export interface Adjunto{
  id?:string,
  proceso_id?:string,
  descripcion?:string,
  archivo?:string,
}
