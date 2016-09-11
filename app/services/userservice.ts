import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage, SqlStorage } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {
  private loggedIn : boolean;
  private storage = null;
  private authToken = null;
  public api_url = false ? "https://jpweb-unimodern.c9users.io/":"/";

  constructor(private http: Http) {
    this.storage = new Storage(SqlStorage);
  }
  
  loadToken(){
    return this.storage.get("auth_token").then(
        (token) => {
            console.log(token);
            this.authToken = token;
            this.loggedIn = true;
            return token;
        },
        (error) => {
            console.log(error);
            this.authToken = null;
            this.loggedIn = false;
        }
    );
  }

  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        this.api_url+'rest/login', 
        JSON.stringify({ username, password }), 
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        //console.log("login in userservice: " + JSON.stringify(res));
        if (res.success) {
          //this.storage.set('auth_token', res.token);
          //this.storage.query("INSERT INTO token (token) VALUES (?)", [res.token]);
          this.storage.set("auth_token", res.token);
          this.authToken = res.token;
          this.loggedIn = true;
        } else {
          //console.log('login failed ' + JSON.stringify(res));
          this.authToken = null;
          this.loggedIn = false;
        }

        return res;
      });
  }
  
  logout() {
    return this.storage.remove('auth_token').then(
          (res) => {
              //console.log("auth_token removal success: ("+JSON.stringify(res)+")");
              this.loggedIn = false;
              return this.loggedIn;
          },
          (error) => {
              //console.log("auth_token removal fail: ("+JSON.stringify(error)+")");
          });
  }

  isLoggedIn() {
    return this.storage.get('auth_token').then((res) => {
        console.log('userService constructor: ' + res);
        this.authToken = res;
        this.loggedIn = !!res;
        return this.loggedIn;
      });
  }
  getToken(){
    return this.authToken;
  }
  
}