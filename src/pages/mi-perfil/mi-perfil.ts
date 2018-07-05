import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CambiarPasswordPage } from '../cambiar-password/cambiar-password';

declare var swal: any;

@IonicPage()
@Component({
  selector: 'page-mi-perfil',
  templateUrl: 'mi-perfil.html',
})
export class MiPerfilPage implements OnInit {

  forma: FormGroup;
  notificaciones:boolean;
  imagenPreview: string;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public usuarioService: UsuarioProvider,
              private camera: Camera,
              private imagePicker: ImagePicker,
              public modalCtrl: ModalController
            ) {
              if(this.usuarioService.usuario.notificaciones === 1){
                this.notificaciones = true;
              }else{
                this.notificaciones = false;
              }
            }
  
  ngOnInit(){
    this.forma = new FormGroup({
      nombres: new FormControl(this.usuarioService.usuario.nombre, Validators.required),
      email: new FormControl(this.usuarioService.usuario.email, [Validators.required, Validators.email]),
      notificaciones: new FormControl(this.notificaciones)
    });    
  }

  mostrarCamara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
     this.usuarioService.actualizarFoto(this.usuarioService.usuario.id,this.imagenPreview).subscribe();
    }, (err) => {
      swal("ERROR", "Error al abrir Camara: "+JSON.stringify(err), "warning");
    });
  }

  mostrarImagenes(){    
    let opciones:ImagePickerOptions = {
      quality: 100,
      outputType:1,
      maximumImagesCount: 1
    }

    this.imagePicker.getPictures(opciones).then((results) => {

      for (var i = 0; i < results.length; i++) {
          this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
      }
      this.usuarioService.actualizarFoto(this.usuarioService.usuario.id, this.imagenPreview).subscribe();
    }, (err) => { 
      swal("ERROR", "Error al abrir Selector de Imagenes: "+JSON.stringify(err), "warning");
    });
  }


  actualizar(){
    if(this.forma.valid){
      this.usuarioService.actualizarDatosUsuario(this.usuarioService.usuario.id, this.forma.value.nombres, this.forma.value.email, this.forma.value.notificaciones)
          .subscribe()
    }
  }

  cambiarPassword(){
    const modal = this.modalCtrl.create(CambiarPasswordPage,{
      'user_id': this.usuarioService.usuario.id
    });
    modal.present();
  }
          
}
