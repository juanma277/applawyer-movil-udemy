import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProcesoProvider } from '../../providers/proceso/proceso';

@IonicPage()
@Component({
  selector: 'page-por-juzgado',
  templateUrl: 'por-juzgado.html',
})
export class PorJuzgadoPage implements OnInit{

  user_id:string;
  opcion:number;
  procesos = [];
  procesosCantidad = [];
  juzgadosNombre = [];
  total;

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

              if(this.opcion === 1){
                this.cargarGraficaBarras();
              }else{
                this.cargarGraficasPie();                
              }
  }

  ngOnInit() {
    let cantidad = 0;
    let totalProcesos = 0;
    
    this.procesoService.procesosPorJuzgado(this.user_id).subscribe((resp:any)=>{
      this.procesos = resp.process;
      for(let y=0; y< resp.process.length; y++){
        this.procesosCantidad.push(resp.process[y].cantidad);
        this.juzgadosNombre.push(resp.process[y].ABV);
        cantidad = parseInt(JSON.stringify(resp.process[y].cantidad));
        totalProcesos += cantidad;
      }
      this.total = totalProcesos;
    });
    
    
  }


dismiss() {
  this.viewCtrl.dismiss();
  }

cargarGraficaBarras(){
  this.barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    
  }

  this.barChartLabels = this.juzgadosNombre;
  this.barChartType = 'bar';
  this.barChartLegend = true;
  this.barChartData = [
    {data: this.procesosCantidad, label: 'Procesos'}
  ];
}

cargarGraficasPie(){

  this.doughnutChartLabels = this.juzgadosNombre;
  this.doughnutChartData = this.procesosCantidad;
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