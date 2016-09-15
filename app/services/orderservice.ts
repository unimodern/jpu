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
    public order :any;
    private fetched = false; 
    public _status  = {
        10: {text: "Ordered", color: "primary"},
        20: {text: "Confirmed", color: "secondary"},
        30: {text: "Ready", color: "dark"},
        40: {text: "Cancelled", color: "danger"},
        50: {text: "Picked up", color: "light"},
      };
    public _statusMap = {
        "Ordered": {value: 10, message: "Your order status changed to ordered. Thanks!"},
        "Confirmed": {value: 20, message: "Your order is confirmed. Thanks!"},
        "Ready": {value: 30, message: "Your order is ready. Thanks!"},
        "Cancelled": {value: 40, message: "Your order is cancelled."},
        "Picked up": {value: 50, message: "Thank you for your business!"},
    };


    constructor(private http:Http, private productService: ProductService, private userService: UserService) {
      this.order = [];
    }
  
    fetchOrders() {
        //console.log("Order service fetchOrders, userService: " + JSON.stringify(this.userService));
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Authorization:" + this.userService.getToken());
        headers.append('Authorization', "Basic "+ window.btoa(this.userService.getToken()+":")); 
        //console.log("this:"+JSON.stringify(this));
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
                //console.log("order: " +k+ "|" + JSON.stringify(this.orders[k]));
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
    changeStatus(order_id, status) {
        console.log("Changing order: " + order_id + " status to " + status);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Authorization:" + this.userService.getToken());
        headers.append('Authorization', "Basic "+ window.btoa(this.userService.getToken()+":")); 
        //console.log("this:"+JSON.stringify(this));
        return this.http
          .get(this.userService.api_url + 'rest/change-order-status?id='+order_id+'&status='+status, { headers })
          .map(res => res.json())
          .map(res => {
                console.log("OrderService.changeStatus done");
                return res;
              },
            err => {
              console.log("http fail!");
            } 
        );
    }
}