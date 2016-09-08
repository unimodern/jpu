import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {OrderService} from '../../services/orderservice';
import {UserService} from '../../services/userservice';
import {OrderPage} from '../order/order';
import {SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'build/pages/orders/orders.html',
  providers: [OrderService, UserService]
})
export class OrdersPage {
  private orders : any;
  constructor( 
    private orderService: OrderService, 
    private navCtrl: NavController,
    private userService: UserService
    ) {
      this.userService.loadToken().then(token => {
        if(!token) {
          console.log("!isLoggedIn:"+token);
          this.navCtrl.push(SettingsPage);
        }
      });
      this.orderService.loadOrders().then(
      res => {
        console.log("orders loaded:" +JSON.stringify(res));
        this.orders=res;
      });
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
  
  itemSelected(order_id) { 
    console.log("Heading OrderPage: "+order_id);
    this.orderService.getOrder(order_id).then(
      res => {
        console.log("itemSelected:" + JSON.stringify(res));
        this.navCtrl.push(OrderPage, {
          order: res.order,
          orderProducts: res.orderProducts
        });
      });
  }
}
