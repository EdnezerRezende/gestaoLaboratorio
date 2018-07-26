import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { HttpRestServiceProvider } from '../http-rest-service/http-rest-service';

const CHAVE = 'avatar-usuario';
@Injectable()
export class UsuariosServiceProvider {
  private _url:string = this._httpRest.getUrl();
  private _headers:HttpHeaders;

  private _usuarioLogado: Usuario;
  
  constructor(private _http: HttpClient, private _httpRest: HttpRestServiceProvider) {
    this._usuarioLogado = new Usuario();
    this._url = this._httpRest.getUrl();
    this._headers = this._httpRest.getHeaders();

  }

  efetuaLogin(email, senha) {
    // this.dadosFicticios();
    return true;
    
  }
  
  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }

  setUsuarioLogado(usuario: Usuario){
    this._http.post(this._url+'usuario/usuarioLogado', usuario.email,
    {headers: this._headers
  })
    .subscribe((usuarioR:Usuario)=> {this._usuarioLogado = usuarioR});
  }

  setUsuarioRecebido(usuario:Usuario){
    this._usuarioLogado = usuario;
  }

  obtemAvatar() {
    return localStorage.getItem(CHAVE)
            ? localStorage.getItem(CHAVE)
            : 'assets/img/avatar-padrao.jpg';
  }

  salvaAvatar(avatar){
    localStorage.setItem(CHAVE,avatar);
  }

  alterarDadosUsuario(usuario:Usuario){
    return this._http.post(this._url+'alterarSenha', usuario, {headers:this._headers})
  }

}
