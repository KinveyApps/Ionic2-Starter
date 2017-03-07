import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  user: Kinvey.User

  constructor(public alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController) {
    this.user = Kinvey.User.getActiveUser() || new Kinvey.User();
  }

  logout() {
    this.user.logout()
      .then(() => {
        const modal = this.modalCtrl.create(LoginPage, null, { enableBackdropDismiss: false });
        modal.onDidDismiss((user) => {
          this.user = user;
       });
        modal.present();
      });
  }

  save(profile) {
    this.user.update(profile)
      .then(() => {
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Your profile has been saved!',
          buttons: ['OK']
        });
        alert.present();
      })
      .catch((error: Kinvey.KinveyBaseError) => {
        let alert = this.alertCtrl.create({
          title: error.name,
          subTitle: error.message,
          buttons: ['RETRY']
        });
        alert.present();
      })
  }

}
