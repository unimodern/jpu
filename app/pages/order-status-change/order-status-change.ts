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

  constructor(
    private navCtrl: NavController,
    private orderService: OrderService, 
    private navParams: NavParams,
    public viewCtrl: ViewController
    ) {
    this.order = this.navParams.get('order');
    console.log("in shopping cart: " + JSON.stringify(this.order));
  }

}
