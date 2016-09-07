import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage, LocalStorage, SqlStorage } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {  
    
    private storage :Storage;
    private orders :any;
    private authToken = null;

    constructor(private http:Http) {
        this.storage = new Storage(SqlStorage);
        this.storage.get("auth_token").then(
            (token) => {
                console.log(token);
                this.authToken = token;
            },
            (error) => {
                console.log(error);
                this.authToken = null;
            }
        );
    }
  
    fetchOrders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if(!this.authToken) {
            console.log("no authToken");
        }
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
              console.log("http fail!");
              this.storage.get("orders").then((value) => {
                this.orders = JSON.parse(value);
              });
            } 
        );
    }
  
    loadOrders() {
        return this.storage.get("orders").then(
            (orders) => {
                console.log("Got orders");
                return JSON.parse(orders);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    getOrder(order_id) {
        return this.loadOrders().then(
                (orders) => {
                    console.log("OrderService.getOrder start");
                    for(let order of orders)
                        if(order.id == order_id) {
                            console.log("OrderService.getOrder:" + JSON.stringify(order));
                            return order;
                        }
                    console.log("OrderService.getOrder not found");
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}