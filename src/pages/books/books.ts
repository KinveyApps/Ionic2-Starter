import { Component } from '@angular/core';
import {AlertController, ModalController, NavController } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';

import { LoginPage } from '../login/login';

class Book {
  title: string;
  author: string;
  review: string;
}

@Component({
  selector: 'page-books',
  templateUrl: 'books.html'
})
export class BooksPage {
  books: Array<Book>

  constructor(public alertCtrl: AlertController, modalCtrl: ModalController, public navCtrl: NavController) {
    if (Kinvey.User.getActiveUser() === null) {
      const modal = modalCtrl.create(LoginPage, null, { enableBackdropDismiss: false });
      modal.onDidDismiss(() => {
         this.reload();
       });
      modal.present();
    }
  }

  ionViewWillEnter() {
    if (Kinvey.User.getActiveUser() !== null) {
      this.reload();
    }
  }

  reload() {
    const store = Kinvey.DataStore.collection('books') as Kinvey.CacheStore;
    store.find()
      .subscribe((books: Array<Book>) => {
        this.books = books;
      }, (error: Kinvey.KinveyBaseError) => {
        let alert = this.alertCtrl.create({
          title: error.name,
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      });
  }
}
