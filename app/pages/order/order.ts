import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OrderService} from '../../services/orderservice';

@Component({
  templateUrl: 'build/pages/order/order.html',
})
export class OrderPage {
  private order :any;
  private orderProducts : any;
  constructor(private orderService: OrderService, private navCtrl: NavController, private navParams: NavParams) {
    this.order = navParams.get('order');
    //console.log("OrderPage params: " + JSON.stringify({order:this.order, orderProducts:this.orderProducts}));
  }
  

}
