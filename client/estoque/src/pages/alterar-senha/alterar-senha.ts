import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';


@IonicPage()
@Component({
  selector: 'page-alterar-senha',
  templateUrl: 'alterar-senha.html',
})
export class AlterarSenhaPage {
  private _usuario: Usuario;
  private senha1 : string;
  private senha2 : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _usuarioProvider: UsuariosServiceProvider,
    private  _loadingCtrl: LoadingController,
    private _toastCtrl: ToastController,
    private _alertCtrl: AlertController) {

    this._usuario = new Usuario();

  }

  ionViewWillEnter(){
    if (this.navParams.get('usuario')){
      this._usuario = this.navParams.get('usuario');
      this._usuario.senha = '';
    }
  }

  alterarSenha(value: any){
    let loading = this._loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Validando...'
    });

    loading.present();
    if ( this.senha1 == this.senha2 ){
      let usuarioAlterado = new Usuario();
      usuarioAlterado = this._usuario;
      usuarioAlterado.senha = value.password;
      this._usuarioProvider.alterarDadosUsuario(usuarioAlterado)
      .subscribe(() => loading.dismiss(),
                err => {
                  loading.dismiss();
                  this._alertCtrl.create({
                    title: 'Falha',
                    subTitle: 'Não foi possível alterar a senha, tente novamente mais tarde!',
                    buttons: [
                      {
                        text: 'Ok'
                      }
                    ]
                  }).present();
                }
              );
        this.navCtrl.pop();
    }else{
      loading.dismiss();
      this._alertCtrl.create({
        title: 'Falha',
        subTitle: 'Favor repetir a nova senha , favor tentar novamente!',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      }).present();
    }
  }
}
