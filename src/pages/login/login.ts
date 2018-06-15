import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(  public navCtrl: NavController,
                private afAuth: AngularFireAuth,
                public usuarioProvider: UsuarioProvider,
                private platform: Platform,
                private fb: Facebook,
                private googlePlus: GooglePlus) {
  }

  loginNormal(){
    
  }

  signInWithGoogle(){
    this.googlePlus.login({
      'webClientId': '120255805446-mg32vjgka2hperfu3677icfr9reulsbl.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then( user => {
        console.log(JSON.stringify(user));
        this.usuarioProvider.cargarUsuario(user.displayName, user.email,user.photoURL, user.uid, 'Google');
        this.navCtrl.setRoot(HomePage);
      })
      .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
    }).catch(err => console.error("Error: ", err));
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      //DISPOSITIVO MOVIL
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential).then(user=>{
          console.log(user);
          this.usuarioProvider.cargarUsuario(user.displayName, user.email,user.photoURL, user.uid, 'Facebook');
          this.navCtrl.setRoot(HomePage);
        }).catch(error =>{
          alert("Error Login: "+ JSON.stringify(error));
        });
      })
    }else{
      //COMPUTADOR
      this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        console.log(res);
        let user = res.user;
        this.usuarioProvider.cargarUsuario(user.displayName, user.email,user.photoURL, user.uid, 'Facebook');
        this.navCtrl.setRoot(HomePage);
      });
    }
  }
}
