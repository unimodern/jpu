import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {OrderService} from '../../services/orderservice';


/*
  Generated class for the ShoppingCartPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/shopping-cart/shopping-cart.html',
})
export class ShoppingCartPage {
  private order: any;
  constructor(
    private navCtrl: NavController,
    private orderService: OrderService, 
    private navParams: NavParams,
    public viewCtrl: ViewController
    ) {
    //this.order = orderService.order;
    this.order = this.navParams.get('order');
    console.log("in shopping cart: " + JSON.stringify(this.order));
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  changeOrder(i, c) {
    let q = this.order[i].quantity;
    switch(c){
      case -1:
        this.order[i].quantity = q > 1 ? q-1:1;
        break;
      case 1:
        this.order[i].quantity = q+1;
        break;
      case 0:
        this.order[i].quantity = 0;
        break;
    }
    if(this.order[i].quantity == 0)
      this.order.splice(i,1);
    this.orderService.order = this.order;
  }
}
