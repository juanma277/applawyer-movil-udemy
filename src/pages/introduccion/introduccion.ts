import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AjustesProvider } from '../../providers/ajustes/ajustes'

@IonicPage()
@Component({
  selector: 'page-introduccion',
  templateUrl: 'introduccion.html',
})
export class IntroduccionPage {

  slides:any[] = [
    {
      title: "Bienvenido!!!",
      description: "Esta <b>aplicación</b> nos ayudará a llevar el control de tus almuerzos y muchos productos mas!",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "¿Qué es TuTiquetera?",
      description: "<b>TuTiquetera App</b> tiene registrados muchos restaurantes en el cual puedes comprar tu tiquetera, saber el menú del día y cuantos almuerzos te quedan.",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "¿Que hace esta app?",
      description: "Esta aplicación nos ayudará a conocer todos los restaurantes de Popayán que ofrecen el servicio de Tiqueteras!",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];
  

  constructor(public navCtrl: NavController,
              public ajustesProvider: AjustesProvider ) {
  }

  saltar_tutorial(){
    this.ajustesProvider.ajustes.intro = false; 
    this.ajustesProvider.guardarStorage();
    this.navCtrl.setRoot(LoginPage);
  }

  

 

}
