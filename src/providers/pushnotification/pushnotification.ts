import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@Injectable()
export class PushnotificationProvider {

  constructor(private oneSignal: OneSignal, public platform: Platform, public alertCtrl: AlertController) {}

  init_notifications(){
    if(this.platform.is('cordova')){

      this.oneSignal.startInit('39bba61e-1019-42bd-8c88-cdc7caf8d3ca', '749122570449');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationOpened()
      .subscribe(jsonData => {
        let alert = this.alertCtrl.create({
          title: jsonData.notification.payload.title,
          subTitle: jsonData.notification.payload.body,
          buttons: ['OK']
        });
        alert.present();
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      });
      this.oneSignal.endInit();
      this.oneSignal.getIds().then((id) => {
        console.log(id);
        let alert = this.alertCtrl.create({
            title: 'the onesignal ids object',
            message: JSON.stringify(id),
            buttons: [{
              text: 'Ok',
              role: 'ok'
            }]
          });
          alert.present();
      });
     
    }
     
  }

}
