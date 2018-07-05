import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-informes',
  templateUrl: 'informes.html',
})
export class InformesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 // Doughnut
public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
public doughnutChartData:number[] = [350, 450, 100];
public doughnutChartType:string = 'doughnut';

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

}
