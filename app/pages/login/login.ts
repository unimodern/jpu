import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserService} from '../../services/userservice';
import {TabsPage} from '../tabs/tabs';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  private message : String;
  constructor(private userService: UserService, private navCtrl: NavController, public alertCtrl: AlertController) {
  }
  login(username, password) {
    this.message = "";
    this.userService.login(username, password).subscribe((result) => {
      console.log("Login Page: "+result);
      if (result.success) {
        if(this.navCtrl.canGoBack()){
          this.navCtrl.pop();
        } else {
          this.navCtrl.setRoot(TabsPage);
        }
      } else {
        let alert = this.alertCtrl.create({
          title: 'Login',
          subTitle: result.message,
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

}
