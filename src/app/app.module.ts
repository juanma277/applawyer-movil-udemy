import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//PAGES
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { OlvidoPasswordPage } from '../pages/olvido-password/olvido-password';
import { TerminosPage } from '../pages/terminos/terminos';
import { MisProcesosPage } from '../pages/mis-procesos/mis-procesos';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
import { MiPerfilPage } from '../pages/mi-perfil/mi-perfil';
import { InformesPage } from '../pages/informes/informes';



//PROVIDER
import { UsuarioProvider } from '../providers/usuario/usuario';
import { AjustesProvider } from '../providers/ajustes/ajustes';

//PLUGINS
import { Facebook} from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicStorageModule } from '@ionic/storage';

//FORMULARIOS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//HTTPCLIENT
import { HttpClientModule } from '@angular/common/http';

//FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../config/firebase.config';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    OlvidoPasswordPage,
    TerminosPage,
    MisProcesosPage,
    NotificacionesPage,
    MiPerfilPage,
    InformesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    OlvidoPasswordPage,
    TerminosPage,
    MisProcesosPage,
    NotificacionesPage,
    MiPerfilPage,
    InformesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    Facebook,
    GooglePlus,
    AjustesProvider
  ]
})
export class AppModule {}
