import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { RegistroPage } from '../registro/registro';
import { OlvidoPasswordPage } from '../olvido-password/olvido-password';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, ToastController } from 'ionic-angular';

declare var swal: any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  forma: FormGroup;

  constructor(  public navCtrl: NavController,
                private afAuth: AngularFireAuth,
                public usuarioService: UsuarioProvider,
                private platform: Platform,
                private fb: Facebook,
                private googlePlus: GooglePlus,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController
              ) {}

  ngOnInit(){
    this.forma = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });    
  }
 
  registro(){
    this.navCtrl.push(RegistroPage);
  }

  olvidoPass(){
    this.navCtrl.push(OlvidoPasswordPage);
  }
  
  
  loginNormal(){

    const loader = this.loadingCtrl.create({
      content: "Por favor espera...",
    });

    loader.present();

    if(this.forma.invalid){
      swal("Advertencia", "Existen campos obligatorios sin ingresar!", "warning");
      loader.dismiss();
      return;
    }

    this.usuarioService.loginNormal(this.forma.value.email, this.forma.value.password).subscribe((resp:any)=>{
      loader.dismiss();
      if(resp){

        let toast = this.toastCtrl.create({
          message: 'Bienvenido: '+this.usuarioService.usuario.nombre,
          duration: 3000,
          position: 'bottom',
          cssClass: "toast",
        });
    
        toast.present(toast);
        this.navCtrl.setRoot(HomePage);
      }
    },error=>{
      loader.dismiss();
      swal("Error", "Ha ocurrido un problema por favor intentalo de nuevo ", "warning");

    });
    
  }

  signInWithGoogle(){
    this.googlePlus.login({
      'webClientId': '120255805446-mg32vjgka2hperfu3677icfr9reulsbl.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then( user => {
        this.usuarioService.cargarUsuario(user.displayName, user.email,user.photoURL, user.uid, 'Google', 'USER_ROLE', '', '', 0);
        this.usuarioService.guardarStorage();
        //this.navCtrl.setRoot(HomePage);
      })
      .catch( error => swal("Firebase failure", JSON.stringify(error), "warning"));
    }).catch(err => swal("Firebase failure", JSON.stringify(err), "warning"));
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      //DISPOSITIVO MOVIL
      this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential).then(user=>{
          this.usuarioService.cargarUsuario(user.displayName, user.email,user.photoURL, user.uid, 'Facebook', 'USER_ROLE', '', '', 0);
          this.usuarioService.guardarStorage();
          //this.navCtrl.setRoot(HomePage);
        }).catch(error =>{
          alert("Error Login: "+ JSON.stringify(error));
        });
      })
    }else{
      //COMPUTADOR
      this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        let user = res.user;
        this.usuarioService.cargarUsuario(user.displayName, user.email,user.photoURL, user.uid, 'Facebook', 'USER_ROLE', '', '', 0);
        this.usuarioService.guardarStorage();
        //this.navCtrl.setRoot(HomePage);
      });
    }
  }
}
