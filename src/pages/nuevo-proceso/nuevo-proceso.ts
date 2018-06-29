import { Component, OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoProcesoProvider } from '../../providers/tipo-proceso/tipo-proceso';
import { JuzgadoProvider } from '../../providers/juzgado/juzgado';
import { Proceso, ProcesoProvider } from '../../providers/proceso/proceso';
import { UsuarioProvider } from '../../providers/usuario/usuario';

declare var swal: any;

@IonicPage()
@Component({
  selector: 'page-nuevo-proceso',
  templateUrl: 'nuevo-proceso.html',
})
export class NuevoProcesoPage implements OnInit {

  forma: FormGroup;
  tipos = [];
  juzgados = [];
  proceso: Proceso = {};

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public tipoProcesoService: TipoProcesoProvider,
                public juzgadoService: JuzgadoProvider,
                public procesoService: ProcesoProvider,
                public usuarioService: UsuarioProvider,
                public loadingCtrl: LoadingController,
                
              )
          {
        this.tipoProcesoService.cargarTiposActivos().subscribe((resp:any)=>{
          if(resp.error){
            swal("Advertencia", "No  existen tipos de procesos!", "warning");
            return;
          }else{
            for(var i=0; i<resp.types.length ; i++){
              this.tipos.push(resp.types[i]);
            }
          }
        });

        this.juzgadoService.cargarJuzgadoActivos().subscribe((resp:any)=>{
          if(resp.error){
            swal("Advertencia", "No  existen Juzgados!", "warning");
            return;
          }else{
            for(var i=0; i<resp.courts.length ; i++){
              this.juzgados.push(resp.courts[i]);
            }
          }
        });
  }
  
  ngOnInit(){
    this.forma = new FormGroup({
      tipo_proceso: new FormControl(null, Validators.required),
      juzgado: new FormControl(null, [Validators.required, Validators.email]),
      demandante: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      radicado: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required)
    });    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  registrar(){

    const loader = this.loadingCtrl.create({
      content: "Por favor espera...",
    });

    loader.present();

    if(this.forma.value.tipo_proceso === null || this.forma.value.juzgado === null || this.forma.value.fecha === null ){
      swal("Advertencia", "Existen campos obligatorios sin ingresar!", "warning");
      loader.dismiss();
      return;
    }

      this.proceso.tipo_proceso_id = this.forma.value.tipo_proceso;
      this.proceso.juzgado_id = this.forma.value.juzgado;
      this.proceso.user_id = this.usuarioService.usuario.id;
      this.proceso.demandante = this.forma.value.demandante;
      this.proceso.demandado = this.forma.value.demandado;
      this.proceso.radicado = this.forma.value.radicado;
      this.proceso.fecha = this.forma.value.fecha;

      this.procesoService.crearProceso(this.proceso).subscribe((resp:any)=>{
        if(resp.error){
          swal("Error", "Existe información duplicada o faltan datos!", "warning");
          loader.dismiss();
          return;
        }else{
          swal("Correcto", "Proceso creado!", "success");
          loader.dismiss();
          this.proceso  = {};
          this.forma.setValue({
            tipo_proceso: '',
            juzgado: '',
            demandante: '',
            demandado: '',
            radicado: '',
            fecha: ''
          });
          this.procesoService.cargarProcesos(this.usuarioService.usuario.id).subscribe();
          return;
        }
      }, error =>{
          swal("Error", "Lo sentimos ha ocurrido un error, por favor intentalo nuevamente.", "warning");
          loader.dismiss();
          return;
      });
  }


}
