import {Component} from '@angular/core';
import {OrdersPage} from '../orders/orders';
import {ProductsPage} from '../products/products';
import {OrderPage} from '../order/order';
import {LoginPage} from '../login/login';
import {SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    this.tab1Root = OrdersPage;
    this.tab2Root = ProductsPage;
    this.tab3Root = SettingsPage;
  }

}
