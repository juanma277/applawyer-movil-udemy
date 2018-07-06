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
import { AboutPage } from '../pages/about/about';
import { NuevoProcesoPage } from '../pages/nuevo-proceso/nuevo-proceso';
import { ActuacionesPage } from '../pages/actuaciones/actuaciones';
import { AlertasPage } from '../pages/alertas/alertas';
import { AdjuntosPage } from '../pages/adjuntos/adjuntos';
import { EditarAlertaPage } from '../pages/editar-alerta/editar-alerta';
import { EditarAdjuntoPage } from '../pages/editar-adjunto/editar-adjunto';
import { CambiarPasswordPage } from '../pages/cambiar-password/cambiar-password';
import { PorCiudadPage } from '../pages/por-ciudad/por-ciudad';
import { PorEstadoPage } from '../pages/por-estado/por-estado';
import { PorJuzgadoPage } from '../pages/por-juzgado/por-juzgado';
import { PorTipoPage } from '../pages/por-tipo/por-tipo';


//PIPES
import { SplitPipe } from '../pipes/split/split';
import { ImagenPipe } from '../pipes/imagen/imagen';
import { ImagenUserPipe } from '../pipes/imagen-user/imagen-user';


//PROVIDER
import { UsuarioProvider } from '../providers/usuario/usuario';
import { AjustesProvider } from '../providers/ajustes/ajustes';
import { ProcesoProvider } from '../providers/proceso/proceso';
import { TipoProcesoProvider } from '../providers/tipo-proceso/tipo-proceso';
import { JuzgadoProvider } from '../providers/juzgado/juzgado';
import { AlertaProvider } from '../providers/alerta/alerta';
import { AdjuntoProvider } from '../providers/adjunto/adjunto';
import { IonicImageViewerModule } from 'ionic-img-viewer';

//PLUGINS
import { Facebook} from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { ChartsModule } from 'ng2-charts';


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
    InformesPage,
    AboutPage,
    NuevoProcesoPage,
    ActuacionesPage,
    AlertasPage,
    AdjuntosPage,
    EditarAlertaPage,
    EditarAdjuntoPage,
    CambiarPasswordPage,
    PorCiudadPage,
    PorEstadoPage,
    PorJuzgadoPage,
    PorTipoPage,
    SplitPipe,
    ImagenPipe,
    ImagenUserPipe
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
    HttpClientModule,
    IonicImageViewerModule,
    ChartsModule
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
    InformesPage,
    AboutPage,
    NuevoProcesoPage,
    ActuacionesPage,
    AlertasPage,
    AdjuntosPage,
    EditarAlertaPage,
    EditarAdjuntoPage,
    CambiarPasswordPage,
    PorCiudadPage,
    PorEstadoPage,
    PorJuzgadoPage,
    PorTipoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    Facebook,
    GooglePlus,
    AjustesProvider,
    ProcesoProvider,
    TipoProcesoProvider,
    JuzgadoProvider,
    AlertaProvider,
    Camera,
    ImagePicker,
    AdjuntoProvider
  ]
})
export class AppModule {}
