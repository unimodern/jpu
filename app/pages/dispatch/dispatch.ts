import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {LoginPage} from '../login/login';
import {UserService} from '../../services/userservice';
//import {App} from '../../app';

/*
  Generated class for the DispatchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/dispatch/dispatch.html',
})
export class DispatchPage {

  constructor(private userService: UserService, private navCtrl: NavController, public app: App) {
    this.userService.isLoggedIn().then((res)=>{
    console.log("dispatch constructor: " + res)
    if(res){
        navCtrl.setRoot(TabsPage);
      } else {
        //this.app.getActiveNav().push(LoginPage);
        let nav = this.app.getRootNav()
        nav.setRoot(LoginPage);        
      }
    });
  }

}
