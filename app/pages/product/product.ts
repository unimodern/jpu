import { Component } from '@angular/core';
import {NavController, NavParams, Slides, ActionSheetController, LoadingController} from 'ionic-angular';
import {ProductService} from '../../services/productservice';
import {EditProductPage} from '../edit-product/edit-product';


/*
  Generated class for the ProductPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/product/product.html',
})
export class ProductPage {
  private product: any;
  private mySlideOptions = {
    initialSlide: 1,
    loop: true
  };
  private _status: any;
  constructor(
      private productService: ProductService, 
      private navCtrl: NavController, 
      private navParams: NavParams,
      public actionSheetCtrl: ActionSheetController,
      public loadingCtrl: LoadingController
    ) {
    //console.log("ProductPage rec: " + JSON.stringify(navParams.get('product')))
    this.product = navParams.get('product');
    this._status = productService._status;
  }
  changeStatus() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Change status',
      buttons: [
        {
          text: 'Activate',
          handler: () => {
            console.log('Destructive clicked');
            this.presentLoading();
            this.productService.changeStatus(this.product.id, 10).subscribe((resp)=>{
              return this.navCtrl.pop().then((resp) => {
                  this.navCtrl.push(ProductPage, this.productService.getProduct(this.product.id))
                });
            });
          }
        },{
          text: 'Inactivate',
          role: 'destructive',
          handler: () => {
            console.log('Inactivate clicked');
            this.presentLoading();
            this.productService.changeStatus(this.product.id, 20).subscribe((resp)=>{
              return this.navCtrl.pop().then((resp) => {
                  this.navCtrl.push(ProductPage, this.productService.getProduct(this.product.id))
                });
            });
          }
        },{
          text: 'Archive',
          role: 'destructive',
          handler: () => {
            console.log('Archive clicked');
            this.presentLoading();
            this.productService.changeStatus(this.product.id, 30).subscribe((resp)=>{
              return this.navCtrl.pop().then((resp) => {
                  this.navCtrl.push(ProductPage, this.productService.getProduct(this.product.id))
                });
            });
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    loader.present();
  }
  editProduct(product_id) {
    console.log("Heading ProductEdit: " + product_id);
    this.navCtrl.push(EditProductPage, this.productService.getProduct(product_id));
  }

}
