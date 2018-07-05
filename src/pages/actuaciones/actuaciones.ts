import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController} from 'ionic-angular';
import { ProcesoProvider } from '../../providers/proceso/proceso';
import { AlertasPage } from '../alertas/alertas';
import { AdjuntosPage } from '../adjuntos/adjuntos';
import { AlertaProvider } from '../../providers/alerta/alerta';
import { EditarAlertaPage } from '../editar-alerta/editar-alerta';
import { AdjuntoProvider } from '../../providers/adjunto/adjunto';
import { EditarAdjuntoPage } from '../editar-adjunto/editar-adjunto';

@IonicPage()
@Component({
  selector: 'page-actuaciones',
  templateUrl: 'actuaciones.html',
})
export class ActuacionesPage {

  proceso_id:string;
  proceso = [];
  dataProceso = [];

  opciones: string = "actuaciones";

  constructor( public navCtrl: NavController, 
               public navParams: NavParams,
               public procesoService: ProcesoProvider,
               public loadingCtrl: LoadingController,
               public modalCtrl: ModalController,
               public alertaService: AlertaProvider,
               public alertCtrl: AlertController,
               public adjuntoService: AdjuntoProvider
             ) 
        {
          this.proceso_id = navParams.get('proceso_id');
          this.cargarProceso();
          this.alertaService.cargarAlertaPorProceso(this.proceso_id).subscribe();
          this.adjuntoService.cargarAdjuntosPorProceso(this.proceso_id).subscribe();
        }
  
  cargarProceso(){
    const loader = this.loadingCtrl.create({
      content: "Por favor espera...",
    });

    loader.present();
    this.procesoService.obtenerProceso(this.proceso_id).subscribe((resp:any)=>{
      if (!resp.error){
        for(var i=0; i<resp.process.length ; i++){
          this.proceso.push(resp.process[i]);
        }

        for(var y=0; y<resp.data.length ; y++){
          this.dataProceso.push(resp.data[y]);
        }
      }else{

        for(var y=0; y<resp.data.length ; y++){
          this.dataProceso.push(resp.data[y]);
        }

      }
      loader.dismiss();
    });
  }


  nuevaAlerta(){
    const modal = this.modalCtrl.create(AlertasPage, {
      id: this.proceso_id
    });
    modal.present();    
  }

  nuevoAdjunto(){
    const modal = this.modalCtrl.create(AdjuntosPage, {
      id: this.proceso_id      
    });
    modal.present();    
  }

  editarAlerta(alerta_id:string){   
    const modal = this.modalCtrl.create(EditarAlertaPage, {
      alerta_id: alerta_id,
      proceso_id: this.proceso_id
    });
    modal.present(); 
  }

  editarAdjunto(adjunto_id:string){   
    const modal = this.modalCtrl.create(EditarAdjuntoPage, {
      adjunto_id: adjunto_id,
      proceso_id: this.proceso_id
    });
    modal.present(); 
  }

  eliminarAlerta(alerta_id:string){
    const confirm = this.alertCtrl.create({
      title: 'Eliminar Alarma',
      message: '¿Seguro que deseas eliminar la alarma?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {

            const loader = this.loadingCtrl.create({
              content: "Por favor espera...",
            });

            loader.present();

            this.alertaService.eliminarAlerta(alerta_id, this.proceso_id).subscribe((resp:any)=>{
              loader.dismiss();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  eliminarAdjunto(adjunto_id:string){
    const confirm = this.alertCtrl.create({
      title: 'Eliminar Adjunto',
      message: '¿Seguro que deseas eliminar el Adjunto?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {

            const loader = this.loadingCtrl.create({
              content: "Por favor espera...",
            });

            loader.present();

            this.adjuntoService.eliminarAdjunto(adjunto_id, this.proceso_id).subscribe((resp:any)=>{
              loader.dismiss();
            });
          }
        }
      ]
    });
    confirm.present();
  } 
  
}


