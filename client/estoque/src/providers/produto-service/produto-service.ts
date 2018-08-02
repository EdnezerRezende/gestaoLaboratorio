import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Produto } from '../../modelos/produtos';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';


@Injectable()
export class ProdutoServiceProvider {

  private _url:string;

  public handleError:any;
  private _headers:HttpHeaders;

  constructor(private _http: HttpClient, private _httpRest: HttpRestServiceProvider) {
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();
  }

  salvar(produto: Produto){
    return this._http.post(this._url+'produto/salvar', produto);
  }

  obterProdutos(){
    return this._http.get<Produto[]>(this._url+'produto/listaProdutos');
  }

  deletarProduto(id: number){
    return this._http.post(this._url + `produto/excluirProduto/${id}`, {
      headers: this._headers
    });
    // .catch((error: HttpErrorResponse) => this._httpRest.handleAngularJsonBug(error));
  }        

  
}
