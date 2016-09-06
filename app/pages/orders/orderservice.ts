import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage, LocalStorage, SqlStorage } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {  
    
    private storage = null;
    private orders = null;
    private authToken = null;

    constructor(private http:Http) {
        this.storage = new Storage(SqlStorage);
        this.storage.get("token").then((token) => {
            this.authToken = token;
        });
        //this.storage.query("CREATE TABLE IF NOT EXISTS order (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER, name TEXT, pickup_date TEXT)");
    }
  
    fetchOrders() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Basic "+ window.btoa(this.authToken+":")); 
        console.log("this:"+JSON.stringify(this));
        return this.http
          .get('/rest/orders', { headers })
          .map(res => res.json())
          .map(res => {
                console.log("res:"+res.orders);
                this.orders = res.orders;
                this.storage.set("orders", JSON.stringify(res.orders));
                console.log("OrderService.fetchOrders done");
                return res.orders;
              },
            err => {
              console.log("http fail!")
              this.storage.get("orders").then((value) => {
                this.orders = JSON.parse(value);
              });
            } 
        );
    }
  
    // getOrders() {
    //     if(!this.orders)
    //         this.orders = this.fetchOrders();
    //     console.log("OrderService.getOrders done");
    //     return this.orders;
    // }
    // getOrder(order_id) {
    //     if(!this.orders)
    //         this.fetchOrders();
    //     // for(let order in this.orders)
    //     //     if(order.id == order_id) {
    //     //         console.log("OrderService.getOrder:" + JSON.stringify(order));
    //     //         return this.orders[i];
    //     //     }
    //     console.log("OrderService.getOrder done");
    // }
}