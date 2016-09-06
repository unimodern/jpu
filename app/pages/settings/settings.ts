import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserService} from './userservice';
import {OrdersPage} from '../orders/orders';

@Component({
  templateUrl: 'build/pages/settings/settings.html',
  providers: [UserService]
})
export class SettingsPage {
  constructor(private userService: UserService, private navCtrl: NavController) {
  
  }
  login(username, password) {
      this.userService.login(username, password).subscribe((result) => {
          if (result) {
            this.navCtrl.setRoot(OrdersPage);
          }
        });
  }
}
