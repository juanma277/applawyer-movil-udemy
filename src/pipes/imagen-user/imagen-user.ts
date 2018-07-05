import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenUser',
})
export class ImagenUserPipe implements PipeTransform {
  
  transform(codigo: string) {
    return "http://localhost:8000/images/users/"+codigo;
  }
}
