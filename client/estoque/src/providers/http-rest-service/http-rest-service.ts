import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpRestServiceProvider {

  private _url = 'http://192.168.1.193:8080/api/';

  constructor(private _http: HttpClient) {

  }

  getUrl(){
    return this._url;
  }

}
