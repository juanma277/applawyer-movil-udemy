import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { AdjuntoProvider, Adjunto } from '../../providers/adjunto/adjunto';



declare var swal: any;


@IonicPage()
@Component({
  selector: 'page-adjuntos',
  templateUrl: 'adjuntos.html',
})
export class AdjuntosPage implements OnInit {

  forma: FormGroup;
  adjunto: Adjunto = {};
  imagenPreview: string;
  proceso_id:string;

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams,
                public viewCtrl: ViewController,
                private camera: Camera,
                public loadingCtrl: LoadingController,
                private imagePicker: ImagePicker
              ) {

                this.proceso_id = navParams.get('id');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit(){
    this.forma = new FormGroup({
      descripcion: new FormControl(null, Validators.required),
    });    
  }

  registrar(){
    const loader = this.loadingCtrl.create({
      content: "Por favor espera...",
    });

    loader.present();

    if(this.forma.value.descripcion === null ){
      swal("Advertencia", "Existen campos obligatorios sin ingresar!", "warning");
      loader.dismiss();
      return;
    }

    this.adjunto.proceso_id = this.proceso_id;
    this.adjunto.descripcion = this.forma.value.descripcion;
    this.adjunto.archivo = this.forma.value.fecha;
   
    this.alertaService.crearAlerta(this.alerta).subscribe((resp:any)=>{
      if(resp.error){
        swal("Error", "Existe información duplicada o faltan datos!", "warning");
        loader.dismiss();
        return;
      }else{
        swal("Correcto", "Alarma creada!", "success");
        loader.dismiss();
        this.alerta  = {};
        this.forma.setValue({
          descripcion: '',
          fecha: '',
          hora: '',
        });

        return;
      }
    }, error =>{
        swal("Error", "Lo sentimos ha ocurrido un error, por favor intentalo nuevamente.", "warning");
        loader.dismiss();
        return;
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
    }, (err) => { 
      swal("ERROR", "Error al abrir Selector de Imagenes: "+JSON.stringify(err), "warning");
    });
  }

}
