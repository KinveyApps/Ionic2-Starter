import { Component } from '@angular/core';
import { AlertController, ViewController } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public alertCtrl: AlertController, public viewCtrl: ViewController) {}

  login(username: string, password: string) {
    Kinvey.User.login(username, password)
      .then((user: Kinvey.User) => {
        this.dismiss(user);
      })
      .catch((error: Kinvey.KinveyBaseError) => {
        let alert = this.alertCtrl.create({
          title: error.name,
          subTitle: error.message,
          buttons: ['RETRY']
        });
        alert.present();
      });
  }

  dismiss(data: any) {
    this.viewCtrl.dismiss(data);
  }
}
