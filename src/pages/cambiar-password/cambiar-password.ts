import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';

declare var swal: any;

@IonicPage()
@Component({
  selector: 'page-cambiar-password',
  templateUrl: 'cambiar-password.html',
})
export class CambiarPasswordPage implements OnInit {

  forma: FormGroup;
  user_id:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public usuarioService: UsuarioProvider,
              public viewCtrl: ViewController,
            ) {
      this.user_id = this.navParams.get('user_id');             
  }

  ngOnInit(){
    this.forma = new FormGroup({
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
    }, {validators: this.validarPassword('password', 'password2') });    
  }

  validarPassword(campo1: string, campo2:string){

    return (group: FormGroup)=>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 === pass2){
        return null;
      }

      return {
        sonIguales: true
      };
    }

  }

  actualizar(){
    if(this.forma.invalid){
      swal("Error", "Datos Incorrectos!", "warning");
      return;
    }

    this.usuarioService.actualizarPassword(this.user_id, this.forma.value.password).subscribe((resp:any)=>{
      if(resp.error){
        swal("Error", "Ha ocurrido un error, por favor intentalo nuevamente!", "warning");
      }else{
        swal("Correcto", "Contraseña Actualizada", "success");
        this.viewCtrl.dismiss();
      }
    });    
    
  }

  dismiss(){
    this.viewCtrl.dismiss();    
  }

}
