import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {LoginPage} from '../login/login';
import {UserService} from '../../services/userservice';
import {DbService} from '../../services/dbservice';
//import {App} from '../../app';

/*
  Generated class for the DispatchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/dispatch/dispatch.html',
  providers: [DbService]
})
export class DispatchPage {

  constructor(private userService: UserService, private navCtrl: NavController, public app: App, private dbService: DbService) {
    this.userService.isLoggedIn().then((res)=>{
    console.log("dispatch constructor: " + res)
    if(res){
        this.dbService.fetchAll().subscribe((resp) => {
          navCtrl.setRoot(TabsPage);
        });
      } else {
        let nav = this.app.getRootNav()
        nav.setRoot(LoginPage);        
      }
    });
  }

}
