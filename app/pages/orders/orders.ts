import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {OrderService} from './orderservice';
import {OrderPage} from '../order/order';

@Component({
  templateUrl: 'build/pages/orders/orders.html',
  providers: [OrderService]
})
export class OrdersPage {
  private orders : any;
  constructor(private orderService: OrderService, private navCtrl: NavController) {
  
  }
  
  getOrders(refresher){
    console.log(JSON.stringify(this.orders));
    console.log("OrdersPage getOrders started");
    this.orderService.fetchOrders().subscribe(
          res => {
            console.log(JSON.stringify(res));
            this.orders = res;
            console.log("OrdersPage getOrders ended");
            refresher.complete();
          }
      );
    console.log(JSON.stringify(this.orders));
  }
  
  // itemSelected(order_id) { 
  //   console.log("Heading OrderPage");
  //   let order = this.orderService.getOrder(order_id);
  //   console.log(JSON.stringify(order));
  //   this.navCtrl.push(OrderPage, {
  //     order: order
  //   });
  // }
}
