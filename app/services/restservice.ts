import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestService {
  public api_url = true ? "https://jpweb-unimodern.c9users.io/":"/";
  constructor(private http: Http) {}

}

