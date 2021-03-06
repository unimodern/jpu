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
  public base64Image: Array<any> = [];
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
        sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 640,
        targetHeight: 480,
        correctOrientation: true,
        quality: 100
    }).then((imageData) => {
        this.base64Image.push({img: "data:image/jpeg;base64," + imageData, uploaded: false, id: null});
    }, (err) => {
        console.log(err);
    });
  }  
  uploadPicture(){ 
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 640,
        targetHeight: 480,
        correctOrientation: true,
        quality: 100
    }).then((imageData) => {
        this.base64Image.push({img: "data:image/jpeg;base64," + imageData, uploaded: false, id: null});
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
  uploadBaseImage(baseImg) {
    let loader = this.presentLoading();
    this.productService.uploadImage(this.product.id, baseImg.img).subscribe(res => {
      loader.dismiss();
      console.log("res: "+JSON.stringify(res));
      if(res.result) {
        baseImg.uploaded = true;
        baseImg.id = res.id;
      }
      return res.id;
    });
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    loader.present();
    return loader;
  }

}
