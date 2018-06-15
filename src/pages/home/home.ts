import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider, Credenciales } from '../../providers/usuario/usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:Credenciales = {};

  constructor(  public navCtrl: NavController,
                public usuarioProvider: UsuarioProvider,
                private afAuth:AngularFireAuth,
                public alertCtrl: AlertController) {

                  console.log(this.usuarioProvider.usuario);
                  this.user = this.usuarioProvider.usuario;

                  this.afAuth.authState.subscribe(user =>{
                    console.log(JSON.stringify(user));
                  });

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
