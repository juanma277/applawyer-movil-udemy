import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarAdjuntoPage } from './editar-adjunto';

@NgModule({
  declarations: [
    EditarAdjuntoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarAdjuntoPage),
  ],
})
export class EditarAdjuntoPageModule {}
