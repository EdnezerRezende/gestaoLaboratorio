import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemEstoque } from '../../modelos/itemEstoque';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';
import { EstoqueTotal } from '../../modelos/estoqueTotal';
import 'rxjs/add/operator/catch';
import { Produto } from '../../modelos/produtos';

@Injectable()
export class EstoqueServiceProvider {
  private _url:string;

  public handleError:any;
  private _headers:HttpHeaders;
  
  constructor(private _http: HttpClient, private _httpRest:HttpRestServiceProvider) {
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();
  }

  obterEstoque(){
    return this._http.get<ItemEstoque[]>(this._url+'estoque/listaEstoque');
  }

  salvar(itemEstoque: ItemEstoque){
    return this._http.post(this._url+'estoque/salvar', itemEstoque, {
      headers: this._headers
    });
  }

  deletarItemEstoque(id: number){
    return this._http.post(this._url + `estoque/excluirItemEstoque/${id}`, {
      headers: this._headers
    });
    // .catch((error: HttpErrorResponse) => 
    //     this._httpRest.handleAngularJsonBug(error)
    //   );
  } 

  obterEstoqueTotal(){
    return this._http.get<EstoqueTotal[]>(this._url + 'estoque/totalEstoque', {headers: this._headers});
  }

  obterPedidos(){
    return this._http.get<Produto[]>(this._url + 'estoque/obterPedidos', {headers: this._headers});
  }
}
