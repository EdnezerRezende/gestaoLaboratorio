import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';
import { Usuario } from '../../modelos/usuario';
import { EmailPedido } from '../../modelos/emailPedido';
import { Produto } from '../../modelos/produtos';

@Injectable()
export class PedidosServiceProvider {

  private _url:string;

  public handleError:any;
  private _headers:HttpHeaders;
  
  constructor(private _http: HttpClient, private _httpRest:HttpRestServiceProvider) {
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();
  }

  public enviarEmail(usuarioLogado:Usuario, emailDestinatario:String){
    let emailPedido: EmailPedido = new EmailPedido();
    emailPedido.usuario = usuarioLogado;
    emailPedido.emailDestinatario = emailDestinatario;

    return this._http.post(this._url+'email/enviar', emailPedido, {
      headers: this._headers
    });
  }

  obterPedidos(){
    return this._http.get<Produto[]>(this._url + 'pedidos/obterPedidos', {headers: this._headers});
  }

}
