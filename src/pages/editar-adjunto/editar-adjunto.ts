import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdjuntoProvider, Adjunto } from '../../providers/adjunto/adjunto';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

declare var swal: any;


@IonicPage()
@Component({
  selector: 'page-editar-adjunto',
  templateUrl: 'editar-adjunto.html',
})
export class EditarAdjuntoPage  implements OnInit {

  forma: FormGroup;
  proceso_id: string;
  adjunto_id: string;
  imagenPreview: string;
  adjunto: Adjunto = {};

  constructor(public navCtrl: NavController, 
              public viewCtrl: ViewController,
              public navParams: NavParams,
              private camera: Camera,
              private imagePicker: ImagePicker,
              public loadingCtrl: LoadingController,
              public adjuntoService: AdjuntoProvider,
            ) { 

              this.adjunto_id = navParams.get('adjunto_id');
              this.proceso_id = navParams.get('proceso_id');

              this.cargarAdjunto();
            }

  ngOnInit(){
    this.forma = new FormGroup({
      id: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
    });    
  }

  dismiss() {
    this.viewCtrl.dismiss();
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

  cargarAdjunto(){
    const loader = this.loadingCtrl.create({
      content: "Por favor espera...",
    });

    loader.present();

    this.adjuntoService.cargarDatosAdjunto(this.adjunto_id).subscribe((resp:any)=>{
      if(resp.error){
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
      loader.dismiss();
      return;
      }else{
        this.adjunto = resp.adjunto;        
        this.forma.setValue({
          id: this.adjunto.id,
          descripcion: this.adjunto.descripcion,
        });

        loader.dismiss();
      }
    }, error =>{
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
      loader.dismiss();
    });
  
  }

  actualizar(){
    const loader = this.loadingCtrl.create({
      content: "Por favor espera...",
    });

    loader.present();

    if(this.forma.value.descripcion === null){
      swal("Advertencia", "Existen campos obligatorios sin ingresar!", "warning");
      loader.dismiss();
      return;
    }
    
    this.adjunto.id = this.forma.value.id;
    this.adjunto.proceso_id = this.proceso_id;
    this.adjunto.descripcion = this.forma.value.descripcion;
    this.adjunto.archivo = this.imagenPreview;
   
    this.adjuntoService.actualizarAdjunto(this.adjunto).subscribe((resp:any)=>{
      if(resp.error){
        swal("Error", "Existe información duplicada o faltan datos!", "warning");
        loader.dismiss();
        return;
      }else{
        swal("Correcto", "Adjunto actualizado!", "success");
        loader.dismiss();
        this.adjunto  = {};
        this.viewCtrl.dismiss();
        return;
      }
    }, error =>{
        swal("Error", "Lo sentimos ha ocurrido un error, por favor intentalo nuevamente.", "warning");
        loader.dismiss();
        return;
    });
    
  }


}
