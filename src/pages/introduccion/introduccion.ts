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
      description: "<b>AppLawyer</b> El método más efectivo para conocer novedades de tus procesos judiciales, llevando un control diario desde tu teléfono inteligente, computador o tablet!",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "¿Qué es AppLawyer?",
      description: "<b>AppLawyer</b> Consultamos todos los juzgados, tribunales, corte suprema y consejo de estado sistematizados en la web de la Rama Judicial, agilizando el conocimiento de las novedades procesales.",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "¿Que hace esta app?",
      description: "Añadir procesos, recibir cambios y gestionar las actividades posteriores de forma amigable!",
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
