import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpRestServiceProvider {

  // private _url = 'http://192.168.1.248:8080/api/';
  private _url = 'http://192.168.0.49:8080/api/';
  public log:any;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8'
  ,'Access-Control-Allow-Origin': '*'});

  constructor(private _http: HttpClient) {

  }

  getUrl(){
    return this._url;
  }

  getHeaders(){
    return this._headers;
  }

  public handleAngularJsonBug (error: HttpErrorResponse) {
		const JsonParseError = 'Http failure during parsing for';
		const matches = error.message.match(new RegExp(JsonParseError, 'ig'));

		if (error.status === 200 && matches.length === 1) {
      // return obs that completes;
			return Observable;
		} else {
			this.log.debug('re-throwing ');
			return Observable.throw(error);	
		}
	}

}
