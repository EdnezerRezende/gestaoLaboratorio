import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Produto } from '../../modelos/produtos';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';


@Injectable()
export class ProdutoServiceProvider {

  private _url:string;
  
  public log:any;
  public handleError:any;

  private _headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8'
  ,'Access-Control-Allow-Origin': '*'});

  constructor(private _http: HttpClient, private _httpRest: HttpRestServiceProvider) {
    this._url = this._httpRest.getUrl();
  }

  salvar(produto: Produto){
    return this._http.post(this._url+'produto/salvar', produto);
  }

  obterProdutos(){
    return this._http.get<Produto[]>(this._url+'produto/listaProdutos');
  }

  deletarProduto(id: number){
    return this._http.delete(this._url + `produto/excluirProduto/${id}`, {
      headers: this._headers
    })
    .catch((error: HttpErrorResponse) => this.handleAngularJsonBug(error));
  }        

  private handleAngularJsonBug (error: HttpErrorResponse) {
		const JsonParseError = 'Http failure during parsing for';
		const matches = error.message.match(new RegExp(JsonParseError, 'ig'));

		if (error.status === 200 && matches.length === 1) {
      // return obs that completes;
			return Observable;
		} else {
			this.log.debug('re-throwing ');
			return Observable.throw(error);		// re-throw
		}
	}
}
