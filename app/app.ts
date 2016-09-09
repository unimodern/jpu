import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {DispatchPage} from './pages/dispatch/dispatch';
import {UserService} from './services/userservice';
import {OrderService} from './services/orderservice';
import {ProductService} from './services/productservice';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [UserService, OrderService, ProductService]
})
export class App {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = DispatchPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(App, [UserService, OrderService, ProductService]);
