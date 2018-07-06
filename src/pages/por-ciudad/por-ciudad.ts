import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-por-ciudad',
  templateUrl: 'por-ciudad.html',
})
export class PorCiudadPage {

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams,
                public viewCtrl: ViewController
              ) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
