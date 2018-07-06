import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-por-tipo',
  templateUrl: 'por-tipo.html',
})
export class PorTipoPage {

  constructor(  public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
}

dismiss() {
this.viewCtrl.dismiss();
}

}
