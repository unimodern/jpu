import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {OrderService} from '../../services/orderservice';
import {ProductService} from '../../services/productservice';
import {UserService} from '../../services/userservice';
import {ShoppingCartPage} from '../shopping-cart/shopping-cart';
/*
  Generated class for the AddOrderPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add-order/add-order.html',
})
export class AddOrderPage {
    private products: any;
    private spinner: boolean;
  constructor( 
    private productService: ProductService, 
    private orderService: OrderService, 
    private navCtrl: NavController,
    private userService: UserService,
    public modalCtrl: ModalController
    ) {
      console.log("AddOrderPage - constructor");
      this.spinner = false;
      this.products = productService.getProducts();
      // console.log(JSON.stringify(this.products));
      for(let i = 0; i < this.products.length; i++)
        if(typeof(this.products[i].option) !== 'undefined' && this.products[i].option !== null)
          for(let j = 0; j < this.products[i].option.length; j++) {
            this.products[i].option[j].value = "";
            if(typeof(this.products[i].option[j].items) !== 'undefined')
              for(let k = 0; k < this.products[i].option[j].items.length; k++) {
                this.products[i].option[j].items[k].value=false; 
                console.log(i+"|"+j+"|"+k);
              }
          }
      //console.log(JSON.stringify(this.products));
  }
  addToCart(index){
    this.spinner = true;
    console.log("spinner: "+this.spinner);
    console.log("order before: "+JSON.stringify(this.orderService.order));
    for(let i = 0; i < this.products.length; i++)
      if(i === index) {
        var opt: any;
        opt = [];
        if(typeof(this.products[i].option) !== 'undefined' && this.products[i].option !== null)
          for(let j = 0; j < this.products[i].option.length; j++)
            if(typeof(this.products[i].option[j].items) !== 'undefined')
              for(let k = 0; k < this.products[i].option[j].items.length; k++) 
                if(this.products[i].option[j].items[k].value || this.products[i].option[j].type === "or") { 
                  console.log("i|j|k: "+i+"|"+j+"|"+k+"|"+this.products[i].option[j].value);
                  opt.push({i:i,j:j,k:k,v:this.products[i].option[j].value});
              }
        console.log("opt"+JSON.stringify(opt));
        let hash = (JSON.stringify(opt).split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)).toString();
        console.log("hash: "+hash);
        let found = false;
        for(var j=0; j< this.orderService.order.length; j++)
          if(this.orderService.order[j].hash === hash) {
            this.orderService.order[j].quantity++;
            found = true
            //console.log("product: "+JSON.stringify(this.products[i]));
            console.log("this.orderService.order[j] |"+j+"|"+JSON.stringify(this.orderService.order[j]));
            this.spinner = false;
          } 
        if(!found) {
          this.orderService.order[j] = {product: JSON.parse(JSON.stringify(this.products[i])), quantity: 1, hash: hash};
          //console.log("product: "+JSON.stringify(this.products[i]));
          //console.log("this.orderService.order[hash].product: "+JSON.stringify(this.orderService.order));
          console.log("this.orderService.order[j] new: "+j+"|"+JSON.stringify(this.orderService.order[j]));
          this.spinner = false;
        }
      }
    //console.log("products: "+JSON.stringify(this.products));
    console.log("order after: "+JSON.stringify(this.orderService.order));
    
    console.log("spinner: "+this.spinner);
    return true;
  }
  presentCart() {
    console.log("presentCart: "+JSON.stringify(this.orderService.order));
    let modal = this.modalCtrl.create(ShoppingCartPage, {order: this.orderService.order});
    modal.present();
  }
}
