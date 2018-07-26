import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Camera } from '@ionic-native/camera';
import { normalizeURL } from 'ionic-angular/util/util';
import { AlterarSenhaPage } from '../alterar-senha/alterar-senha';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _camera: Camera
    ) {
  }

  get avatar() {
    return this._usuariosService.obtemAvatar();
  }

  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }

  tiraFoto(){
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI, 
      saveToPhotoAlbum: true,
      correctOrientation:true
    })
    .then(fotoUri => {
      fotoUri = normalizeURL(fotoUri);
      this._usuariosService.salvaAvatar(fotoUri);
    })
    .catch(err => console.log(err));
  }

  alterarDadosUsuario(){
    this.navCtrl.push(AlterarSenhaPage.name, {usuario: this._usuariosService.obtemUsuarioLogado()})
    // this._usuariosService.alterarDadosUsuario();
  }

}
