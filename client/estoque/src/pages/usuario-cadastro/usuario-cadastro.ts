import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-usuario-cadastro',
  templateUrl: 'usuario-cadastro.html',
})
export class UsuarioCadastroPage {

  usuario: Usuario;
  dataNascimento: Date;

  private formulario: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _usuarioService: UsuariosServiceProvider,
              private _loadingCtrl: LoadingController,
              private _alertCtrl: AlertController,
              private formBuilder: FormBuilder,
  ) {
    this.usuario = new Usuario();
    this.criarFormulario();
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      // matricula: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cpf: ['', [Validators.required]]
    });
  }

  tirarMascara(){
    this.usuario.cpf = this.usuario.cpf.replace('.', "").replace('.', "").replace('-', "");
  }

  salvarUsuario(){
    let loading = this.obterLoading();
    loading.present();

    this.tirarMascara();
    this.usuario.dataNascimento = moment(this.dataNascimento).subtract(1, 'month').toISOString();
    
    this._usuarioService.salvarUsuario(this.usuario)
    .subscribe(
      (recebido) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Usuario inserido! Deseja inserir mais produtos ? ',
          buttons: [
            {
              text: 'Sim', 
              handler: ()=> {
                // this.limparCamposFormulario();
              }
            },
            { text: 'Não', 
              handler: ()=>{
              this.navCtrl.pop();
              } 
            }
          ]
        }).present();
      },
      (err) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha',
          subTitle: err.error.message,
          buttons: [
            {
              text: 'Ok', 
              
            }
          ]
        }).present();
      } 
    )
  }


}
