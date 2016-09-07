import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage, LocalStorage, SqlStorage } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {  
    
    private storage :Storage;
    private products :any;
    private authToken = null;

    constructor(private http:Http) {
        this.storage = new Storage(SqlStorage);
        this.storage.query("CREATE TABLE IF NOT EXISTS app_product (" +
            "id INTEGER UNIQUE, " +
        	"business_id INT NOT NULL, " +
        	"name CHAR(50) NOT NULL, " +
        	"slug CHAR(50) NOT NULL, " +
        	"excerp CHAR(100), " +
        	"description TEXT, " +
            "minimum_time INTEGER NOT NULL, " +
            "normal_price INTEGER DEFAULT 0, " +
            "sale_price INTEGER DEFAULT 0, " +
            "tax INTEGER DEFAULT 0, " +
            "weight INTEGER DEFAULT 0, " +
        	"option TEXT, " +
            "status INTEGER DEFAULT 10, " +
            "type INTEGER DEFAULT 0 " +
        	") ").then(
            (res) => {
                console.log("Create product table success: ("+JSON.stringify(res)+")");
            },
            (error) => {
                console.log("Create product table fail: ("+JSON.stringify(error)+")");
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
  
    fetchProducts() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if(!this.authToken) {
            console.log("no authToken");
        }
        headers.append('Authorization', "Basic "+ window.btoa(this.authToken+":")); 
        console.log("this:"+JSON.stringify(this));
        return this.http
          .get('/rest/products', { headers })
          .map(res => res.json())
          .map(res => {
                console.log("res:"+res.products);
                this.products = res.products;
                this.storage.set("products", JSON.stringify(res.products));
                for(let product of res.products){
                    this.storage.query("UPDATE OR IGNORE app_product SET business_id=?, name=?, slug=?, excerp=?, description=?, minimum_time=?, normal_price=?, sale_price=?, tax=?, weight=?, option=?, status=?, type=? WHERE id=? ", [product.business_id, product.name, product.slug, product.excerp, product.description, product.minimum_time, product.normal_price, product.sale_price, product.tax, product.weight, product.option, product.status, product.type, product.id]).then(
                            (res) => {
                                console.log("UPDATE Query success: ("+JSON.stringify(res)+")");
                            },
                            (error) => {
                                console.log("UPDATE Query fail: " + JSON.stringify(error));
                            }
                        );
                    this.storage.query("INSERT OR IGNORE INTO app_product (id, business_id, name, slug, excerp, description, minimum_time, normal_price, sale_price, tax, weight, option, status, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ", [product.id, product.business_id, product.name, product.slug, product.excerp, product.description, product.minimum_time, product.normal_price, product.sale_price, product.tax, product.weight, product.option, product.status, product.type]).then(
                            (res) => {
                                console.log("INSERT Query success: ("+JSON.stringify(res)+")");
                            },
                            (error) => {
                                console.log("INSERT Query fail: " + JSON.stringify(error));
                            }
                        );
                }
                console.log("ProductService.fetchProducts done");
                return res.products;
              },
            err => {
              console.log("http fail!");
            } 
        );
    }
  
    loadProducts() {
        console.log("Getting products: (select * from app_product)");
        return this.storage.query('SELECT * FROM app_product').then(
            (resp) => {
                let products = [];
                if (resp.res.rows.length > 0) {
                    for (var i = 0; i < resp.res.rows.length; i++) {
                      products.push(resp.res.rows.item(i));
                    }
                  }
                console.log("Got products: ("+JSON.stringify(products)+")");
                return products;
            },
            (error) => {
                console.log("Product fetch error" + JSON.stringify(error));
            }
        );
    }
    getProduct(product_id) {
        console.log("Getting product: (select * from app_product where id="+product_id+')');
        return this.storage.query('SELECT * FROM app_product WHERE id=?', [product_id]).then(
            (resp) => {
                console.log("Got product: ("+JSON.stringify(resp)+")");
                return resp.res.rows.item(0);
            },
            (error) => {
                console.log("Product fetch error" + JSON.stringify(error));
            }
        );
        
    }
}