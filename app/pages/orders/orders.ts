import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {OrderService} from '../../services/orderservice';
import {ProductService} from '../../services/productservice';
import {UserService} from '../../services/userservice';
import {OrderPage} from '../order/order';
import {AddOrderPage} from '../add-order/add-order';
import {LoginPage} from '../login/login';
import {OrderStatusChangePage} from '../order-status-change/order-status-change';

@Component({
  templateUrl: 'build/pages/orders/orders.html',
}) 
export class OrdersPage {
  private orders: any;
  private _status: any;
  searchQuery: string = '';
  constructor( 
    private productService: ProductService, 
    private orderService: OrderService, 
    private navCtrl: NavController,
    private userService: UserService,
    public modalCtrl: ModalController
    ) {
      this._status = orderService._status;
      this.userService.isLoggedIn().then((res)=>{
        console.log("orders: " + res);
        if(!res) {
            navCtrl.setRoot(LoginPage);
          }
        });
        this.orders = this.orderService.getOrders();
  }
  
  getOrders(refresher){
    //console.log(JSON.stringify(this.orders));
    console.log("OrdersPage getOrders started");
    this.orderService.fetchOrders().subscribe(
          res => {
            //console.log(JSON.stringify(res));
            this.orders = res;
            console.log("OrdersPage getOrders ended");
            refresher.complete();
          }
      );
    //console.log(JSON.stringify(this.orders));
  }
  
  itemSelected(order_id) { 
    console.log("Heading OrderPage: "+order_id);
    this.navCtrl.push(OrderPage, this.orderService.getOrder(order_id));
  }
  addOrder(){
    this.navCtrl.push(AddOrderPage);
  }
  callIt(passedNumber){
    window.location = passedNumber;
  }
  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.orders = this.orderService.getOrders().filter((order) => {
        return (order.name.toLowerCase().indexOf(val.toLowerCase()) > -1) || (order.phone.replace(/\D/g,'').indexOf(val.replace(/\(\)\-\+/g,'')) > -1) || (order.pin.indexOf(val) > -1);
      })
    } else {
      this.orders = this.orderService.getOrders(); 
    }
  }
  changeOrderStatus(order) {
    console.log("changeOrderStatus: "+JSON.stringify(order));
    let modal = this.modalCtrl.create(OrderStatusChangePage, {order: order});
    modal.present();
  }  
}
