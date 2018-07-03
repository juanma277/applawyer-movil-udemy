import { URL_IMAGENES } from '../../config/server.config';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  
  transform(codigo: string) {
    return "http://localhost:8000/images/adjuntos/"+codigo;
  }
}
