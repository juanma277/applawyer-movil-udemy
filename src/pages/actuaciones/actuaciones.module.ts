import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActuacionesPage } from './actuaciones';

@NgModule({
  declarations: [
    ActuacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(ActuacionesPage),
  ],
})
export class ActuacionesPageModule {}
