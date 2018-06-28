import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario';


@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado: Usuario;
  
  constructor(private _http: HttpClient) {
    this._usuarioLogado = new Usuario();
    this.dadosFicticios();
  }

  efetuaLogin(email, senha) {
    this.dadosFicticios();
    return true;
    // return this._http.post<Usuario>('http://localhost:8080/api/login', { email, senha})
    //           .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  dadosFicticios(){
    this._usuarioLogado.email = "godoirezende@gmail.com";
    this._usuarioLogado.nome = "Ednezer";
    this._usuarioLogado.dataNascimento = "18/03/1978";
    this._usuarioLogado.telefone = "61 982819541";
  }
  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }

  obtemAvatar() {
    return 'assets/img/avatar-padrao.jpg';
    // return localStorage.getItem(CHAVE)
    //         ? localStorage.getItem(CHAVE)
    //         : 'assets/img/avatar-padrao.jpg';
  }

}
