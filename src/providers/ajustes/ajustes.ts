import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular'

@Injectable()
export class AjustesProvider {

  ajustes = {
    intro: true
  }

  constructor(  private storage: Storage, 
                public platform:Platform) { }


  cargarStorage(){
    let promesa = new Promise((resolve, reject)=>{
      if(this.platform.is('cordova')){
        //DISPOSITIVO MOVIL
        this.storage.ready().then(()=>{
          this.storage.get('ajustes').then(ajustes=>{
            if(ajustes){
              this.ajustes = ajustes;
            }
            resolve();
          });
        });
      }else{
        //COMPUTADOR
        if(localStorage.getItem('ajustes')){
          //Cargar del Storage
          this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
        }
        resolve();
      }
    });
    return promesa;
  }

  guardarStorage(){
    if(this.platform.is('cordova')){
      //DISPOSITIVO MOVIL
      this.storage.ready().then(()=>{
        this.storage.set('ajustes', this.ajustes);
      });
    }else{
      //COMPUTADOR
      //Grabar en Storage
      localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    }
  }

}
