import { Component } from '@angular/core';
import { UsuarioProvider, Usuario } from '../../providers/usuario/usuario';
import { AlertController, NavController, ModalController, LoadingController  } from 'ionic-angular';
import { ProcesoProvider } from '../../providers/proceso/proceso';
import { NuevoProcesoPage } from '../nuevo-proceso/nuevo-proceso';
import { ActuacionesPage } from '../actuaciones/actuaciones';

declare var swal: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:Usuario = {};
  advertencia:boolean = false;

  constructor(  public navCtrl: NavController,
                public usuarioProvider: UsuarioProvider,
                public alertCtrl: AlertController,
                public usuarioService: UsuarioProvider,
                public procesoService: ProcesoProvider,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController
             )
                {

                  this.user = this.usuarioProvider.usuario;
                  const loader = this.loadingCtrl.create({
                    content: "Por favor espera...",
                  });

                  loader.present();

                  this.procesoService.cargarProcesos(this.user.id).subscribe((resp:any)=>{
                    if(resp.error){
                      this.advertencia = true;
                      loader.dismiss();
                      return;
                    }
                    this.advertencia = false;
                    loader.dismiss();
                    return;
                    
                  });
  }

  eliminarProceso(){
    const confirm = this.alertCtrl.create({
      title: 'Eliminar Proceso',
      message: '¿Seguro que deseas eliminar el proceso?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Aceptar clicked');      
          }
        }
      ]
    });
    confirm.present();    
  }

  nuevoProceso(){
    const modal = this.modalCtrl.create(NuevoProcesoPage);
    modal.present();
  }

  detalles(id:number){
    this.navCtrl.push(ActuacionesPage,{
      proceso_id: id
    });

  }

}
