import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProcesoProvider } from '../../providers/proceso/proceso';

@IonicPage()
@Component({
  selector: 'page-por-juzgado',
  templateUrl: 'por-juzgado.html',
})
export class PorJuzgadoPage {

  user_id:string;
  opcion:number;
  procesosCantidad = [];
  juzgadosNombre = [];

  /////// DATOS GRAFICA BARRAS /////
  public barChartOptions:any = {};
  public barChartLabels:string[] = [];
  public barChartType:string;
  public barChartLegend:boolean;
  public barChartData:any[] = [];

  ////// DATOS GRAFICA PIE //////
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string;
 
  constructor(  public navCtrl: NavController, 
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public procesoService: ProcesoProvider
             ) {

              this.user_id = this.navParams.get('user_id');
              this.opcion = this.navParams.get('opcion');

              this.procesoService.procesosPorJuzgado(this.user_id).subscribe((resp:any)=>{
                for(let y=0; y< resp.process.length; y++){
                  this.procesosCantidad.push(resp.process[y].cantidad);
                  this.juzgadosNombre.push(resp.process[y].nombre);
                }
                
              });

              if(this.opcion === 1){
                this.cargarGraficaBarras();
              }else{
                this.cargarGraficasPie();                
              }
  }

dismiss() {
  this.viewCtrl.dismiss();
  }

cargarGraficaBarras(){
  this.barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  this.barChartType = 'bar';
  this.barChartLegend = true;
  this.barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
}

cargarGraficasPie(){

  for(let i=0; i<this.procesosCantidad.length; i++){
    this.doughnutChartData =this.procesosCantidad[i];
  }

  for(let i=0; i<this.juzgadosNombre.length; i++){
    this.doughnutChartLabels = this.juzgadosNombre[i];
  }

  //this.doughnutChartLabels = this.juzgadosNombre;
  //this.doughnutChartData = this.procesosCantidad;
  this.doughnutChartType = 'doughnut';
}

cambiarGrafica(opcion:number){
  this.opcion = opcion;
  if(this.opcion === 1){
    this.cargarGraficaBarras();
    return;
  }else{
    this.cargarGraficasPie();
    return;
  }
}

}

export interface DatosPie{
  cantidad?:string,
  juzgado?:string
}