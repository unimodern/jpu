import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OrderService} from '../../services/orderservice';
import {ProductService} from '../../services/productservice';
import {UserService} from '../../services/userservice';

/*
  Generated class for the AddOrderPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add-order/add-order.html',
})
export class AddOrderPage {
    private order: any;
    private products: any;
  constructor( 
    private productService: ProductService, 
    private orderService: OrderService, 
    private navCtrl: NavController,
    private userService: UserService
    ) {
      console.log("AddOrderPage - constructor");
      this.order = [];
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
    for(let i = 0; i < this.products.length; i++)
      if(i === index) {
        var opt: any;
        opt = [];
        if(typeof(this.products[i].option) !== 'undefined' && this.products[i].option !== null)
          for(let j = 0; j < this.products[i].option.length; j++)
            if(typeof(this.products[i].option[j].items) !== 'undefined')
              for(let k = 0; k < this.products[i].option[j].items.length; k++) 
                if(this.products[i].option[j].items[k].value) { 
                  console.log("i|j|k: "+i+"|"+j+"|"+k);
                  opt.push({i,j,k});
                  //console.log("opt"+JSON.stringify(opt));
              }
        let hash = JSON.stringify(opt).split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        if(typeof this.order[hash] == "undefined") {
          this.order[hash] = {product: this.products[i], quantity: 1};
        } else {
          this.order[hash].quantity++;
        }
      }
    console.log(JSON.stringify(this.products));
    console.log(JSON.stringify(this.order));
  }

}
