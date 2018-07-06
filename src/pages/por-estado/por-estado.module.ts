import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PorEstadoPage } from './por-estado';

@NgModule({
  declarations: [
    PorEstadoPage,
  ],
  imports: [
    IonicPageModule.forChild(PorEstadoPage),
  ],
})
export class PorEstadoPageModule {}
