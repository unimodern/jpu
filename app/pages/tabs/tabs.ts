import {Component} from '@angular/core';
import {OrdersPage} from '../orders/orders';
import {ProductsPage} from '../products/products';
import {OrderPage} from '../order/order';
import {SettingsPage} from '../settings/settings';
import {ContactPage} from '../contact/contact';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = OrdersPage;
    this.tab2Root = ProductsPage;
    this.tab3Root = SettingsPage;
  }
}
