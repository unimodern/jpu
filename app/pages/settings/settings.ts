import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserService} from '../../services/userservice';
import {OrderService} from '../../services/orderservice';
import {OrdersPage} from '../orders/orders';
import {TabsPage} from '../tabs/tabs';
import {ProductsPage} from '../products/products';
import {DispatchPage} from '../dispatch/dispatch';

@Component({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  private loggedIn : boolean;
  constructor(private userService: UserService, private orderService: OrderService, private navCtrl: NavController) {
      this.loggedIn = this.userService.isLoggedIn();
      console.log("Settings page constructor: " + this.userService.isLoggedIn());
  }
  login(username, password) {
    this.userService.login(username, password).subscribe((result) => {
        if (result) {
          this.loggedIn = true;
          if(this.navCtrl.canGoBack()){
            this.navCtrl.pop();
          } else {
            this.navCtrl.setRoot(OrdersPage);
          }
        } else {
          this.loggedIn = false;
        }
      });
  }
  logout() {
    this.userService.logout().then((resp) => {
      this.loggedIn = !resp;
      console.log("logout done: "+resp+"|"+this.loggedIn+"|"+typeof resp);
      this.navCtrl.setRoot(DispatchPage);
    });
  }
}