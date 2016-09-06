import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage, LocalStorage, SqlStorage } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {
  private loggedIn = false;
  private storage = null;
  private api_url = "/api/" 

  constructor(private http: Http) {
    this.storage = new Storage(SqlStorage);
    //this.storage.query("CREATE TABLE IF NOT EXISTS token (id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT)");
    this.loggedIn = !!localStorage.getItem('auth_token');
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
          localStorage.setItem('auth_token', res.token);
          //this.storage.query("INSERT INTO token (token) VALUES (?)", [res.token]);
          this.storage.set("token", res.token);
          this.loggedIn = true;
        }

        return res.success;
      });
  }
  
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}