import {Page, NavController} from 'ionic-angular';
import {AuthService} from '../home/authservice';
import {HomePage} from '../home/home';



@Page({
 templateUrl: 'build/pages/userpage/userpage.html',
 providers: [AuthService]
})
export class UserPage {
 static get parameters() {
 return [[AuthService],[NavController]];
 }
 
 constructor(dataservice, navcontroller) {
 this.service = dataservice;
 this.nav = navcontroller;
 }
 
 logout() {
 this.service.logout();
 this.nav.setRoot(HomePage);
 }
 
}