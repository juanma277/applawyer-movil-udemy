import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Alerta, AlertaProvider } from '../../providers/alerta/alerta';
import { ProcesoProvider } from '../../providers/proceso/proceso';

declare var swal: any;

@IonicPage()
@Component({
  selector: 'page-editar-alerta',
  templateUrl: 'editar-alerta.html',
})
export class EditarAlertaPage implements OnInit {

  forma: FormGroup;
  proceso_id: string;
  alerta_id: string;
  alerta: Alerta = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public alertaService: AlertaProvider,
              public procesoService: ProcesoProvider
            ) {

          this.alerta_id = navParams.get('alerta_id');
          this.proceso_id = navParams.get('proceso_id');

          this.cargarAlerta();

  }

  ngOnInit(){
    this.forma = new FormGroup({
      id: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required)
    });    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  cargarAlerta(){
    const loader = this.loadingCtrl.create({
      content: "Por favor espera...",
    });

    loader.present();

    this.alertaService.cargarDatosAlerta(this.alerta_id).subscribe((resp:any)=>{
      if(resp.error){
      swal("Advertencia", "Ha ocurrido un error por favor intentalo nuevamente!", "warning");
      loader.dismiss();
      return;
      }else{
        this.alerta = resp.alarma;        
        this.forma.setValue({
          id: this.alerta.id,
          descripcion: this.alerta.descripcion,
          fecha: this.alerta.fecha,
          hora: this.alerta.hora
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

    if(this.forma.value.descripcion === null || this.forma.value.fecha === null || this.forma.value.hora === null ){
      swal("Advertencia", "Existen campos obligatorios sin ingresar!", "warning");
      loader.dismiss();
      return;
    }
    
    this.alerta.id = this.forma.value.id;
    this.alerta.proceso_id = this.proceso_id;
    this.alerta.descripcion = this.forma.value.descripcion;
    this.alerta.fecha = this.forma.value.fecha;
    this.alerta.hora = this.forma.value.hora;
   
    this.alertaService.actualizarAlerta(this.alerta).subscribe((resp:any)=>{
      if(resp.error){
        swal("Error", "Existe información duplicada o faltan datos!", "warning");
        loader.dismiss();
        return;
      }else{
        swal("Correcto", "Alarma actualizada!", "success");
        loader.dismiss();
        this.alerta  = {};
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
