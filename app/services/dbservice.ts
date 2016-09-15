import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage, SqlStorage } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {ProductService} from './productservice';
import {UserService} from './userservice';
import {OrderService} from './orderservice';
import {RestService} from './restservice';
/*
  Generated class for the DbService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DbService {
  private storage :Storage;
  constructor(
    private http: Http, 
    private userService: UserService,
    private orderService: OrderService,
    private restService: RestService,
    private productService: ProductService
    ) {}
    fetchAll() {
        //console.log("DbService: " + JSON.stringify(this.userService));
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Authorization:" + this.userService.getToken());
        headers.append('Authorization', "Basic "+ window.btoa(this.userService.getToken()+":")); 
        //console.log("this:"+JSON.stringify(this));
        return this.http
          .get(this.restService.api_url + 'rest/orders-products', { headers })
          .map(res => res.json())
          .map(res => {
                console.log("res:"+res.orders);
                this.orderService.setOrders(res.orders);
                this.productService.setProducts(res.products);
                this.orderService.setFetched(true);
                this.productService.setFetched(true);
                return true;
              },
            err => {
              console.log("http fail!");
                this.orderService.setFetched(false);
                this.productService.setFetched(false);
              return true;
            } 
        );
    }
}

