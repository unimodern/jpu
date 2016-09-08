import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OrderService} from '../../services/orderservice';

@Component({
  templateUrl: 'build/pages/order/order.html',
  providers: [OrderService]
})
export class OrderPage {
  private order :any;
  private orderProducts : any;
  constructor(private orderService: OrderService, private navCtrl: NavController, private navParams: NavParams) {
    this.order = navParams.get('order');
    this.orderProducts = navParams.get('orderProducts');
    console.log("OrderPage params: " + JSON.stringify({order:this.order, orderProducts:this.orderProducts}));
    //this.orderProducts = [];
    //let orderProducts = JSON.parse(this.order.products);
    // console.log("orderProducts"+JSON.stringify(orderProducts));
    // for(let orderProduct of orderProducts) {
    //   console.log("orderProduct"+JSON.stringify(orderProduct));
    //   this.orderProducts.push({
    //     'options' : (orderProduct.options !== "undefined" ? JSON.parse(orderProduct.options):[]),
    //     'product_id' : orderProduct.product_id,
    //     });
    // }
    // console.log("this.orderProducts"+JSON.stringify(this.orderProducts));
    // console.log("constructing OrderPage"+JSON.stringify(this.order));
  }
  

}
