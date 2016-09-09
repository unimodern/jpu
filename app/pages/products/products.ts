import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProductService} from '../../services/productservice';
import {UserService} from '../../services/userservice';
import {ProductPage} from '../product/product';
import {SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'build/pages/products/products.html',
})
export class ProductsPage {
  private products : any;
  constructor( 
    private productService: ProductService, 
    private navCtrl: NavController,
    private userService: UserService
    ) {
        if(!this.userService.isLoggedIn()) {
          console.log("!isLoggedIn");
          this.navCtrl.setRoot(SettingsPage);
        }
        this.productService.loadProducts().then(
        resp => {
          console.log("products loaded:" +JSON.stringify(resp));
          this.products=resp;
        });
  }
  
  getProducts(refresher){
    console.log(JSON.stringify(this.products));
    console.log("ProductsPage getProducts started");
    this.productService.fetchProducts().subscribe(
          res => {
            console.log(JSON.stringify(res));
            this.products = res;
            console.log("ProductsPage getProducts ended");
            refresher.complete();
          }
      );
    console.log(JSON.stringify(this.products));
  }
  
  itemSelected(product_id) { 
    console.log("Heading ProductPage: "+product_id);
    this.productService.getProduct(product_id).then(
      res => {
        console.log(JSON.stringify(res));
        this.navCtrl.push(ProductPage, {
          product: res
        });
      });
  }
}
