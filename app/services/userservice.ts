import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage, LocalStorage, SqlStorage } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {
  private loggedIn = false;
  private storage = null;
  private authToken = null;
  private api_url = "/api/" 

  constructor(private http: Http) {
    this.storage = new Storage(SqlStorage);
    //this.storage.query("CREATE TABLE IF NOT EXISTS token (id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT)");
    //this.loggedIn = !!localStorage.getItem('auth_token');
    
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
        if (res.success) {
          //this.storage.set('auth_token', res.token);
          //this.storage.query("INSERT INTO token (token) VALUES (?)", [res.token]);
          this.storage.set("auth_token", res.token);
          this.loggedIn = true;
        } 

        return res.success;
      });
  }
  
  logout() {
    this.storage.remove('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    console.log(this.loggedIn ? 'not logged in':'logged in');
    return this.loggedIn;
  }
}