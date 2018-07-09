import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Fornecedor } from '../../modelos/fornecedor';
import { FornecedorServiceProvider } from '../../providers/fornecedor-service/fornecedor-service';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@IonicPage()
@Component({
  selector: 'page-fornecedor-cadastro',
  templateUrl: 'fornecedor-cadastro.html',
})
export class FornecedorCadastroPage {
  
  public fornecedor: Fornecedor;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _fornecedorService: FornecedorServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _nativePageTransitions: NativePageTransitions
  ) {
    this.fornecedor = new Fornecedor();
  }
 

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  salvarfornecedor(){
    let loading = this.obterLoading();
    loading.present();
    this._fornecedorService.salvar(this.fornecedor)
    .subscribe(
      () => {
        loading.dismiss();
        // this._loading.finalizar();
        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Fornecedor inserido! Deseja inserir mais produtos ? ',
          buttons: [
            {
              text: 'Sim', 
              handler: ()=> {
                this.limparCamposFormulario();
              }
            },
            { text: 'Não', 
              handler: ()=>{
                let options: NativeTransitionOptions={
                  direction: 'left',
                  duration: 400,
                  slowdownfactor: -1,
                  iosdelay: 50
            
                };
                this._nativePageTransitions.slide(options);
                this.navCtrl.pop();
              } 
            }
          ]
        }).present();
      },
    (err:Error) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha de cadastro',
          subTitle: err.message,
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      }
    );
  }
 
  limparCamposFormulario(){
    this.fornecedor.nomeFornecedor = "";
    this.fornecedor.nomeContato = "";
    this.fornecedor.cep = "";
    this.fornecedor.cidade = "";
    this.fornecedor.cnpj = "";
    this.fornecedor.contrato = "";
    this.fornecedor.endereco = "";
    this.fornecedor.telefoneContato = undefined;
    this.fornecedor.uf = "";

  }
  

}
