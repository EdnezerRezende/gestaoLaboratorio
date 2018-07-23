import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ReplaySubject, Observable} from "rxjs";
import {tap} from 'rxjs/operators';
import {Storage} from "@ionic/storage";
import {JwtHelperService} from "@auth0/angular-jwt";
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';

@Injectable()
export class AuthProvider {
  private jwtTokenName = 'jwt_token';

  private _url:string;

  authUser = new ReplaySubject<any>(1);

  constructor(private _httpClient: HttpClient, private _httpRest:HttpRestServiceProvider,
              private _storage: Storage,
              private _jwtHelper: JwtHelperService) {
                this._url = this._httpRest.getUrl();
  }


  checkLogin() {
    this._storage.get(this.jwtTokenName).then(jwt => {
      if (jwt && !this._jwtHelper.isTokenExpired(jwt)) {
        this._httpClient.get(`${this._url}authenticate`)
          .subscribe(() => this.authUser.next(jwt),
            (err) => this._storage.remove(this.jwtTokenName).then(() => this.authUser.next(null)));
        // OR
        // this.authUser.next(jwt);
      }
      else {
        this._storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
      }
    });
  }

  login(values: any): Observable<any> {
    return this._httpClient.post(`${this._url}login`, values, {responseType: 'text'})
      .pipe(tap(jwt => this.handleJwtResponse(jwt)));
  }

  logout() {
    this._storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
  }

  signup(values: any): Observable<any> {
    return this._httpClient.post(`${this._url}signup`, values, {responseType: 'text'})
      .pipe(tap(jwt => {
        if (jwt !== 'EXISTS') {
          return this.handleJwtResponse(jwt);
        }
        return jwt;
      }));
  }

  private handleJwtResponse(jwt: string) {
    return this._storage.set(this.jwtTokenName, jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }

}
