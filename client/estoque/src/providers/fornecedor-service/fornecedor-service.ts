import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';
import { Fornecedor } from '../../modelos/fornecedor';


@Injectable()
export class FornecedorServiceProvider {

  private _url:string;

  public handleError:any;
  private _headers:HttpHeaders;
  
  constructor(private _http: HttpClient, private _httpRest:HttpRestServiceProvider) {
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();
  }

  obterFornecedores(){
    return this._http.get<Fornecedor[]>(this._url+'fornecedor/listaFornecedor');
  }

  salvar(fornecedor: Fornecedor){
    return this._http.post(this._url+'fornecedor/salvar', fornecedor, {
      headers: this._headers
    });
  }


  deletarFornecedor(id: number){
    return this._http.delete(this._url + `fornecedor/excluirFornecedor/${id}`, {
      headers: this._headers
    })
    .catch((error: HttpErrorResponse) => this._httpRest.handleAngularJsonBug(error));
  } 

}
