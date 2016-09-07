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
        this.storage.query("CREATE TABLE IF NOT EXISTS app_order (" +
            "id INTEGER UNIQUE, " +
        	"name CHAR(50) NOT NULL, " +
        	"email CHAR(100), " +
        	"phone CHAR(14) NOT NULL, " +
        	"business_id INT NOT NULL, " +
            "pin INTEGER NOT NULL, " +
            "total INTEGER DEFAULT 0, " +
            "sub_total INTEGER DEFAULT 0, " +
            "tax INTEGER DEFAULT 0, " +
            "off INTEGER DEFAULT 0, " +
            "tip INTEGER DEFAULT 0, " +
            "delivery_charge INTEGER DEFAULT 0, " +
            "order_date CHAR(30) NOT NULL, " +
            "pickup_date CHAR(30) NOT NULL, " +
            "message CHAR(150) DEFAULT NULL, " +
            "note text, " +
            "status INTEGER NOT NULL DEFAULT 10, " +
            "type INTEGER NOT NULL DEFAULT 10, " +
            "offline_payment tinyint(1) DEFAULT 0, " +
            "send_sms INTEGER DEFAULT 1, " +
            "delivery INTEGER DEFAULT 0, " +
            "postal_code CHAR(7) DEFAULT NULL, " +
            "address CHAR(255) DEFAULT NULL, " +
        	"products TEXT DEFAULT NULL " +
        	") ").then(
            (res) => {
                console.log("Create order table success: ("+JSON.stringify(res)+")");
            },
            (error) => {
                console.log("Create order table fail: ("+JSON.stringify(error)+")");
            });
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
                for(let order of res.orders){
                    this.storage.query("UPDATE OR IGNORE app_order SET name=?, email=?, phone=?, business_id=?, pin=?, total=?, sub_total=?, tax=?, off=?, tip=?, delivery_charge=?, order_date=?, pickup_date=?, message=?, note=?, status=?, type=?, offline_payment=?, send_sms=?, delivery=?, postal_code=?, address=?, products=? WHERE id=?", [order.name, order.email, order.phone, order.business_id, order.pin, order.total, order.sub_total, order.tax, order.off, order.tip, order.delivery_charge, order.order_date, order.pickup_date, order.message, order.note, order.status, order.type, order.offline_payment, order.send_sms, order.delivery, order.postal_code, order.address, JSON.stringify(order.orderProducts), order.id]).then(
                            (res) => {
                                console.log("UPDATE Query success: ("+JSON.stringify(res)+")");
                            },
                            (error) => {
                                console.log("UPDATE Query fail: " + JSON.stringify(error));
                            }
                        );
                    this.storage.query("INSERT OR IGNORE INTO app_order (id, name, email, phone, business_id, pin, total, sub_total, tax, off, tip, delivery_charge, order_date, pickup_date, message, note, status, type, offline_payment, send_sms, delivery, postal_code, address, products) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ", [
						order.id, 
						order.name, 
						order.email, 
						order.phone, 
						order.business_id, 
						order.pin, 
						order.total, 
						order.sub_total, 
						order.tax, 
						order.off, 
						order.tip, 
						order.delivery_charge, 
						order.order_date, 
						order.pickup_date, 
						order.message, 
						order.note, 
						order.status, 
						order.type, 
						order.offline_payment, 
						order.send_sms, 
						order.delivery, 
						order.postal_code, 
						order.address, 
						JSON.stringify(order.orderProducts)]).then(
                            (res) => {
                                console.log("INSERT Query success: ("+JSON.stringify(res)+")");
                            },
                            (error) => {
                                console.log("INSERT Query fail: " + JSON.stringify(error));
                            }
                        );
                }
                this.storage.query('select * from app_order').then(
                    (orders) => {
                        console.log("Got orders: ("+JSON.stringify(orders)+")");
                    },
                    (error) => {
                        console.log("Orders fetch error" + JSON.stringify(error));
                    }
                );
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
        console.log("Getting orders: (select * from app_product)");
        return this.storage.query('SELECT * FROM app_product').then(
            (resp) => {
                let orders = [];
                if (resp.res.rows.length > 0) {
                    for (var i = 0; i < resp.res.rows.length; i++) {
                      orders.push(resp.res.rows.item(i));
                    }
                  }
                console.log("Got orders: ("+JSON.stringify(orders)+")");
                return orders;
            },
            (error) => {
                console.log("Orders fetch error" + JSON.stringify(error));
            }
        );
    }
    getOrder(order_id) {
        console.log("Getting order: (select * from app_order where id="+order_id+')');
        return this.storage.query('SELECT * FROM app_order WHERE id=?', [order_id]).then(
            (resp) => {
                console.log("Got order: ("+JSON.stringify(resp)+")");
                return resp.res.rows.item(0);
            },
            (error) => {
                console.log("Order fetch error" + JSON.stringify(error));
            }
        );
        
    }
}