import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarAlertaPage } from './editar-alerta';

@NgModule({
  declarations: [
    EditarAlertaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarAlertaPage),
  ],
})
export class EditarAlertaPageModule {}
