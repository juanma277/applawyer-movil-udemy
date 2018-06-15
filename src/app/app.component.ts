import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AjustesProvider } from '../providers/ajustes/ajustes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;

  constructor(  private platform: Platform, 
                statusBar: StatusBar, 
                splashScreen: SplashScreen,
                private ajustesProvider: AjustesProvider) {
    platform.ready().then(() => {
        this.ajustesProvider.cargarStorage().then(()=>{
          if(this.ajustesProvider.ajustes.intro){
            this.rootPage = "IntroduccionPage";
          }else{
            this.rootPage = LoginPage;
          }


          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();
        });
    });
  }
}

