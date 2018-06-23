import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';

declare var swal: any;

@IonicPage()
@Component({
  selector: 'page-olvido-password',
  templateUrl: 'olvido-password.html',
})
export class OlvidoPasswordPage implements OnInit {

  forma: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public usuarioService: UsuarioProvider
             ) { }
    
  ngOnInit(){
    this.forma = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });    
  }

  olvidoPassword(){
    const loader = this.loadingCtrl.create({
      content: "Por favor espera...",
    });

    loader.present();

    if(this.forma.invalid){
      swal("Advertencia", "Existen campos obligatorios sin ingresar!", "warning");
      loader.dismiss();
      return;
    }

    this.usuarioService.olvidoPassword(this.forma.value.email).subscribe((resp:any)=>{
      if(resp.error){
        swal("Error", "El correo ingresado no existe!", "warning");
        loader.dismiss();
        return;        
      }else{
        swal("Correcto", "Se ha enviado un correo electronico al email: "+this.forma.value.email, "success");
        loader.dismiss();
        this.navCtrl.setRoot(LoginPage);
        return;         
      }
    }, error => {
      swal("Error", "Ha ocurrido un problema por favor intentalo de nuevo: "+error, "warning");
    });
    
  }

}
