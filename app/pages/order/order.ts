import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {OrderService} from './../orders/orderservice';

@Component({
  templateUrl: 'build/pages/order/order.html',
  providers: [OrderService]
})
export class OrderPage {
  private order = null;
  constructor(private orderService: OrderService, private navCtrl: NavController) {
    //console.log("constructing OrderPage");
  }
  

}
