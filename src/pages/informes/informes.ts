import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import { PorJuzgadoPage } from '../por-juzgado/por-juzgado';
import { PorTipoPage } from '../por-tipo/por-tipo';
import { PorCiudadPage } from '../por-ciudad/por-ciudad';
import { PorEstadoPage } from '../por-estado/por-estado';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-informes',
  templateUrl: 'informes.html',
})
export class InformesPage {

  user_id:string;

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public usuarioService: UsuarioProvider
            ) { 
              
              this.user_id = this.usuarioService.usuario.id;
            }

  porJuzgado(opcion:number){
    const modal = this.modalCtrl.create(PorJuzgadoPage,{
      'opcion':opcion,
      'user_id':this.user_id
    });
    modal.present();
  }

  porTipo(opcion:number){
    const modal = this.modalCtrl.create(PorTipoPage,{
      'opcion':opcion,
      'user_id':this.user_id
    });
    modal.present();
  }

  porCiudad(opcion:number){
    const modal = this.modalCtrl.create(PorCiudadPage,{
      'opcion':opcion,
      'user_id':this.user_id
    });
    modal.present();
  }

  porEstado(opcion:number){
    const modal = this.modalCtrl.create(PorEstadoPage,{
      'opcion':opcion,
      'user_id':this.user_id
    });
    modal.present();
  }

 
}
