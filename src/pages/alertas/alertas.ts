import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Alerta, AlertaProvider } from '../../providers/alerta/alerta';

declare var swal: any;

@IonicPage()
@Component({
  selector: 'page-alertas',
  templateUrl: 'alertas.html'
})
export class AlertasPage implements OnInit {

  forma: FormGroup;
  alerta: Alerta = {};
  proceso_id:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public alertaService: AlertaProvider
            ) {

      this.proceso_id = navParams.get('id');
  }

  ngOnInit(){
    this.forma = new FormGroup({
      descripcion: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required)
    });    
  }

  registrar(){

    const loader = this.loadingCtrl.create({
      content: "Por favor espera...",
    });

    loader.present();

    if(this.forma.value.descripcion === null || this.forma.value.fecha === null || this.forma.value.hora === null ){
      swal("Advertencia", "Existen campos obligatorios sin ingresar!", "warning");
      loader.dismiss();
      return;
    }

    this.alerta.proceso_id = this.proceso_id;
    this.alerta.descripcion = this.forma.value.descripcion;
    this.alerta.fecha = this.forma.value.fecha;
    this.alerta.hora = this.forma.value.hora;
   
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

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
