import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {OrderService} from '../../services/orderservice';

/*
  Generated class for the OrderStatusChangePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/order-status-change/order-status-change.html',
})
export class OrderStatusChangePage {
  private order: any;
  private sendTextMessage: boolean;
  private textMessage: string;
  private oldMessage = "";

  constructor( 
    private navCtrl: NavController,
    private orderService: OrderService, 
    private navParams: NavParams,
    public viewCtrl: ViewController
    ) { 
    this.order = this.navParams.get('order');
    this.sendTextMessage = true;
    console.log("in shopping cart: " + this.order.id);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  changeTextMessage(text){
    this.oldMessage = this.textMessage;
    this.textMessage = text;
  }
}
