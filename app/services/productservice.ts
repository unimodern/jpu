import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {UserService} from './userservice';
import {Transfer} from 'ionic-native';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {   
    
    private products :any;
    private fetched : boolean;
    public _status = {
        10: {text: "Active", color: "primary"},
        20: {text: "Inactive", color: "danger"},
        30: {text: "Archived", color: "light"},
    };

    constructor(private http:Http, private userService: UserService) {
        this.fetched = false;
    }
  
    fetchProducts() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        if(!this.userService.getToken()) {
            console.log("no authToken");
        }
        headers.append('Authorization', "Basic "+ window.btoa(this.userService.getToken()+":")); 
        //console.log("this:"+JSON.stringify(this));
        return this.http
          .get(this.userService.api_url + 'rest/products', { headers })
          .map(res => res.json())
          .map(res => {
                console.log("res:"+res.products);
                this.products = res.products;
                console.log("ProductService.fetchProducts done");
                this.fetched = true;
                return this.products;
              },
            err => {
              //console.log("http fail!"+JSON.stringify(err));
            } 
        );
    }
  
    getProduct(product_id) {
        console.log("getProduct: "+product_id);
        for(var i = 0; i < this.products.length; i++)
            if(this.products[i].id == product_id) {
                //console.log("getProduct returns: "+JSON.stringify(this.products[i]));
                return {product: this.products[i]};
            }
        console.log("getProduct not found: "+this.products.length + "|" + i);
        return null;
    }
    getProducts(){
        console.log("getProducts: "+this.products);
        return this.products;
    }
    setProducts(products) {
      console.log("setting products: " + products);
      this.products = products;
    } 

    isFetched(){
        console.log("productService isFetched"+this.fetched);
        return this.fetched;
    }
    setFetched(fetched) {
      console.log("setting fetched products: " + fetched);
      this.fetched = fetched;
    }
    changeStatus(product_id, status) {
        console.log("Changing product: " + product_id + "status to " + status);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Authorization:" + this.userService.getToken());
        headers.append('Authorization', "Basic "+ window.btoa(this.userService.getToken()+":")); 
        //console.log("this:"+JSON.stringify(this));
        return this.http
          .get(this.userService.api_url + 'rest/change-product-status?id='+product_id+'&status='+status, { headers })
          .map(res => res.json())
          .map(res => {
                this.products = res.products;
                console.log("ProductService.changeStatus done");
                this.fetched = true;
                return this.products;
              },
            err => {
              console.log("http fail!");
              this.fetched = false;
            } 
        );
    }
    
    saveProduct(product, base64Image) {
        console.log("Saving product: " + product.id);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', "Basic "+ window.btoa(this.userService.getToken()+":")); 
/*        base64Image.forEach((image) => {
            this.upload(image, product.id);
        });
*/        headers.append('Product', JSON.stringify(product)); 
        return this.http
          .get(this.userService.api_url + 'rest/save-product', { headers })
          .map(res => res.json())
          .map(res => {
                this.products = res.products;
                console.log("ProductService.saveProduct done");
                this.fetched = true;
                return this.products;
              },
            err => {
              console.log("http fail!");
              this.fetched = false;
            } 
        );
    }
    uploadImage(product_id, base64Img) {
        console.log("Uploading image for product: " + product_id);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log("Authorization:" + this.userService.getToken());
        headers.append('Authorization', "Basic "+ window.btoa(this.userService.getToken()+":"));         
        let ft = new Transfer();
        let filename =  "1.jpg";
        let options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: headers,
            params: {
                fileName: filename,
                product_id: product_id
            }
        }; 
        return ft.upload(base64Img, this.userService.api_url + 'rest/upload-image', options, false)
        .then((result: any) => {
            //this.success(result);
            console.log("Upload success");
            return true;
        }).catch((error: any) => {
            console.log("Upload failed");
            return false;
        }); 
    }
    
/*    upload = (image: string, product_id) : resp => { 
        let ft = new Transfer();
        let filename =  "1.jpg";
        let options = {
            fileKey: 'file',
            fileName: filename,
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: {
                'Content-Type' : undefined
            },
            params: {
                fileName: filename,
                product_id: product_id
            }
        }; 
        return ft.upload(image, this.userService.api_url + 'rest/upload-image', options, false)
        .then((result: any) => {
            //this.success(result);
            console.log("Upload success");
        }).catch((error: any) => {
            console.log("Upload failed");
        }); 
    }
*/    
    
}