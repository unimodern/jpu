import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OrderService} from '../../services/orderservice';

@Component({
  templateUrl: 'build/pages/order/order.html',
  providers: [OrderService]
})
export class OrderPage {
  private order :any;
  constructor(private orderService: OrderService, private navCtrl: NavController, private navParams: NavParams) {
    this.order = navParams.get('order');
    console.log("constructing OrderPage"+JSON.stringify(this.order));
  }
  

}
