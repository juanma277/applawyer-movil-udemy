import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AjustesProvider } from '../providers/ajustes/ajustes';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { HomePage } from '../pages/home/home';
import { AlertController, Nav, NavController } from 'ionic-angular';
import { MiPerfilPage } from '../pages/mi-perfil/mi-perfil';
import { MisProcesosPage } from '../pages/mis-procesos/mis-procesos';
import { InformesPage } from '../pages/informes/informes';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { AboutPage } from '../pages/about/about';
import { ProcesoProvider } from '../providers/proceso/proceso';

declare var swal: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  homePage = HomePage;
  perfilPage = MiPerfilPage;
  procesosPage = MisProcesosPage;
  informesPage = InformesPage;
  notificacionesPage = NotificacionesPage;
  aboutPage = AboutPage;
  cantidadProcesos:number = 0;

  rootPage:any;
  @ViewChild(Nav) nav: NavController;

  constructor(  private platform: Platform, 
                statusBar: StatusBar, 
                splashScreen: SplashScreen,
                private ajustesProvider: AjustesProvider,
                public usuarioService: UsuarioProvider,
                public alertCtrl: AlertController,
                public procesoService:ProcesoProvider
            ) {
    platform.ready().then(() => {
        this.ajustesProvider.cargarStorage().then(()=>{
          if(this.ajustesProvider.ajustes.intro){
            this.rootPage = "IntroduccionPage";
            return;
              }else{
                this.rootPage = LoginPage;
                return;
              }
        });

        this.usuarioService.cargarStorage().then(()=>{
          if(this.usuarioService.usuario.nombre){
              this.rootPage = HomePage;            
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

  openPage(pagina:string){
    this.nav.push(pagina);
  }

  openPageHome(){
    this.nav.setRoot(this.homePage);
  }

  salir(){
    const confirm = this.alertCtrl.create({
      title: 'Cerrar Sesión',
      message: '¿Seguro que deseas salir de la aplicación?',
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
            this.usuarioService.eliminarStorage();
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }
}

