import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Produto } from '../../modelos/produtos';

@Injectable()
export class ProdutoServiceProvider {

  private _url = 'http://localhost:8080/api/';

  constructor(private _http: HttpClient) {
  }

  salvar(produto: Produto){
    return this._http
              .post(this._url+'produto/salvar', produto);
  }

  obterProdutos(){
    return this._http.get<Produto[]>(this._url+'produto/obterProdutos');
                
  }
}
