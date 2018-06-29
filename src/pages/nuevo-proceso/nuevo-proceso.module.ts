import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoProcesoPage } from './nuevo-proceso';

@NgModule({
  declarations: [
    NuevoProcesoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoProcesoPage),
  ],
})
export class NuevoProcesoPageModule {}
