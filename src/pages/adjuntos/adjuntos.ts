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
                private imagePicker: ImagePicker,
                public adjuntoProvider: AdjuntoProvider
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

    if(this.forma.value.descripcion === null || this.imagenPreview === null ){
      swal("Advertencia", "Existen campos obligatorios sin ingresar!", "warning");
      loader.dismiss();
      return;
    }

    this.adjunto.proceso_id = this.proceso_id;
    this.adjunto.descripcion = this.forma.value.descripcion;
    //this.adjunto.archivo = this.imagenPreview;
    this.adjunto.archivo = "data:image/png;base64,iV BORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHd hcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHjSURBVDjLdZO/alVBEMZ/5+TemxAbFUUskqAoSOJNp4KC 4AsoPoGFIHY+gA+jiJXaKIiChbETtBYLUbSMRf6Aydndmfks9kRjvHdhGVh2fvN9uzONJK7fe7Ai6algA 3FZCAmQqEF/dnihpK1v7x7dPw0woF64Izg3Xl5s1n9uIe0lQYUFCtjc+sVuEqHBKfpVAXB1vLzQXFtdYP HkGFUCoahVo1Y/fnie+bkBV27c5R8A0pHxyhKvPn5hY2MHRQAQeyokFGJze4cuZfav3gLNYDTg7Pklzpw 4ijtIQYRwFx6BhdjtCk+erU0CCPfg+/o2o3ZI13WUlLGo58YMg+GIY4dmCWkCAAgPzAspJW5ePFPlV3VI 4uHbz5S5IQfy/yooHngxzFser30iFcNcuAVGw3A0Ilt91IkAsyCXQg5QO0szHEIrogkiguwN2acCoJhjn ZGKYx4Ujz5WOA2YD1BMU+BBSYVUvNpxkXuIuWgbsOxTHrG3UHIFWIhsgXtQQpTizNBS5jXZQkhkcywZqQ QlAjdRwiml7wU5xWLaL1AvZa8WIjALzIRZ7YVWDW5CiIj48Z8F2pYLl1ZR0+AuzEX0UX035mxIkLq0dhD w5vXL97fr5O3rfwQHJhPx4uuH57f2AL8BfPrVlrs6xwsAAAAASUVORK5CYII="
     
    this.adjuntoProvider.crearAdjunto(this.adjunto).subscribe((resp:any)=>{
      if(resp.error){
        swal("Error", "Existe información duplicada o faltan datos!", "warning");
        loader.dismiss();
        return;
      }else{
        swal("Correcto", "Adjunto creado!", "success");
        loader.dismiss();
        this.adjunto  = {};
        this.forma.setValue({
          descripcion: '',
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
