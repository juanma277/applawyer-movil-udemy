import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-por-estado',
  templateUrl: 'por-estado.html',
})
export class PorEstadoPage {

  constructor(  public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
}

dismiss() {
this.viewCtrl.dismiss();
}

}
