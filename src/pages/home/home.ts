import { Component } from '@angular/core';
import { UsuarioProvider, Usuario } from '../../providers/usuario/usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { AlertController, NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:Usuario = {};

  constructor(  public navCtrl: NavController,
                public usuarioProvider: UsuarioProvider,
                private afAuth:AngularFireAuth,
                public alertCtrl: AlertController,
             )
                {

                  this.user = this.usuarioProvider.usuario;
  }

  salir(){
    const confirm = this.alertCtrl.create({
      title: 'Cerrar Sessión',
      message: '¿Seguro que deseas Cerrar Sessión?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.afAuth.auth.signOut().then( resp =>{
              this.usuarioProvider.usuario = {};
              this.navCtrl.setRoot(LoginPage);
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
