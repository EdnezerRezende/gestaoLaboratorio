import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { NgModel } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import {finalize} from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild('username')
  usernameModel: NgModel;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _authProvider: AuthProvider,
    private _loadingCtrl: LoadingController,
    private _toastCtrl: ToastController) {
  }

  signup(value: any) {
    let loading = this._loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Criando ...'
    });

    loading.present();

    this._authProvider
      .signup(value)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(
        (jwt) => this.showSuccesToast(jwt),
        err => this.handleError(err));
  }

  private showSuccesToast(jwt) {
    if (jwt !== 'EXISTS') {
      const toast = this._toastCtrl.create({
        message: 'Cadastrado com sucesso!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    }
    else {
      const toast = this._toastCtrl.create({
        message: 'Usuário já cadastrado',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();

      this.usernameModel.control.setErrors({'usernameTaken': true});
    }
  }

  handleError(error: any) {
    let message = `Falha inesperada`;

    const toast = this._toastCtrl.create({
      message,
      duration: 5000,
      position: 'bottom'
    });

    toast.present();
  }

}
