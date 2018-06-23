import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TerminosPage } from '../terminos/terminos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioProvider, Usuario } from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';

declare var swal: any;

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage implements OnInit {

  forma: FormGroup;
  usuario: Usuario = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public usuarioService: UsuarioProvider,
              public loadingCtrl: LoadingController
            ) {}

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

  ngOnInit(){
    this.forma = new FormGroup({
      nombres: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      notificaciones: new FormControl(true),
      condiciones: new FormControl(false),
    }, {validators: this.validarPassword('password', 'password2') });    
  }


  presentModal() {
    const modal = this.modalCtrl.create(TerminosPage);
    modal.present();
  }


  registrar(){

    const loader = this.loadingCtrl.create({
      content: "Por favor espera...",
    });

    loader.present();

    if(this.forma.invalid){
      swal("Advertencia", "Existen campos obligatorios sin ingresar!", "warning");
      loader.dismiss();
      return;
    }

    if(!this.forma.value.condiciones){
      swal("Advertencia", "Debes aceptar las condiciones!", "warning");
      loader.dismiss();
      return;
    }

    this.usuario.nombre = this.forma.value.nombres;
    this.usuario.email = this.forma.value.email; 
    this.usuario.password = this.forma.value.password; 
    this.usuario.imagen = null; 
    this.usuario.uid = null; 
    this.usuario.provider = 'Normal'; 
    this.usuario.role = 'USER_ROLE'; 
    this.usuario.estado = 'INACTIVO'; 
    this.usuario.notificaciones = this.forma.value.notificaciones;
    this.usuario.terminos = this.forma.value.condiciones; 

    this.usuarioService.crearUsuario(this.usuario).subscribe((resp:any)=>{
      if(resp.error){
        swal("Error", "Existe información duplicada o faltan datos!", "warning");
        loader.dismiss();
        return;
      }else{
        swal("Correcto", "Usuario creado!", "success");
        loader.dismiss();
        this.usuario  = {};
        this.navCtrl.setRoot(LoginPage);
        return;
      }
    }, error =>{
        swal("Error", "Lo sentimos ha ocurrido un error, por favor intentalo nuevamente.", "warning");
        loader.dismiss();
        return;
    });


  }

}