import { Component } from '@angular/core';

import { BooksPage } from '../books/books';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = BooksPage;
  tab2Root: any = ProfilePage;

  constructor() {

  }
}
