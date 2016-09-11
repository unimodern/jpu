import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {Camera} from 'ionic-native';
import {ProductService} from '../../services/productservice';
import {ProductPage} from '../product/product';


/*
  Generated class for the EditProductPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/edit-product/edit-product.html',
})
export class EditProductPage {
  private product: any;
  public base64Image: Array<string> = [];
  constructor(
      private productService: ProductService, 
      private navCtrl: NavController,
      private navParams: NavParams,
      public loadingCtrl: LoadingController
    ) {
    //console.log("ProductPage rec: " + JSON.stringify(navParams.get('product')))
    this.product = navParams.get('product');
  }
  
  takePicture(){ 
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 640,
        targetHeight: 480,
        correctOrientation: true
    }).then((imageData) => {
        this.base64Image.push("data:image/jpeg;base64," + imageData);
    }, (err) => {
        console.log(err);
    });
  }
  saveProduct(){
    console.log('saveProduct initiated');
    this.presentLoading();
    this.productService.saveProduct(this.product, this.base64Image).subscribe((resp)=>{
      return this.navCtrl.pop().then((resp1) => {
        return this.navCtrl.pop().then((resp2) => {
            this.navCtrl.push(ProductPage, this.productService.getProduct(this.product.id))
          });
        });
    });
    
  }
  removeImage(thumb) {
    let index = this.product.thumbs.indexOf(thumb);
    this.product.thumbs.splice(index,1);
  }
  removeBaseImage(baseImg) {
    let index = this.base64Image.indexOf(baseImg);
    this.base64Image.splice(index,1);
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    loader.present();
  }

}
