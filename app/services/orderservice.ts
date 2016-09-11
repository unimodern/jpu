import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage, SqlStorage } from 'ionic-angular';
import {ProductService} from './productservice';
import {UserService} from './userservice';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {  
    
    private storage :Storage;
    private orders :any;
    private order :any;
    private fetched = false;

    constructor(private http:Http, private productService: ProductService, private userService: UserService) {
    }
  
    fetchOrders() {
        console.log("Order service fetchOrders, userService: " + JSON.stringify(this.userService));
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Authorization:" + this.userService.getToken());
        headers.append('Authorization', "Basic "+ window.btoa(this.userService.getToken()+":")); 
        console.log("this:"+JSON.stringify(this));
        return this.http
          .get(this.userService.api_url + 'rest/orders', { headers })
          .map(res => res.json())
          .map(res => {
                console.log("res:"+res.orders);
                this.orders = res.orders;
                this.fetched = true;
                return this.orders;
              },
            err => {
              console.log("http fail!");
              this.fetched = false;
            } 
        );
    }
  
    getOrder(order_id) {
        console.log("Getting order2: id="+order_id);
        for(var k = 0; k < this.orders.length; k++)
            if (this.orders[k].id == order_id) {
                console.log("order: " +k+ "|" + JSON.stringify(this.orders[k]));
                return {order:this.orders[k]};
            }
        return {order:null};

    }
    
    isFetched() {
      console.log(this.fetched ? 'fetched':'not fetched');
      return this.fetched;
    }
    getOrders() {
      console.log("getting orders: " + this.orders);
      return this.orders;
    }
    setOrders(orders) {
      console.log("setting orders: " + orders);
      this.orders = orders;
    }
    setFetched(fetched) {
      console.log("setting fetched orders: " + fetched);
      this.fetched = fetched;
    }

}