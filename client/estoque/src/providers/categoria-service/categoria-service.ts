import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';
import { Categoria } from '../../modelos/categoria';

@Injectable()
export class CategoriaServiceProvider {

  private _url:string;
  public handleError:any;
  private _headers:HttpHeaders;

  constructor(private _http: HttpClient, private _httpRest:HttpRestServiceProvider) {
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();
  }

  obterCategorias(){
    return this._http.get<Categoria[]>(this._url+'categoria/listaCategoria');
  }

}
