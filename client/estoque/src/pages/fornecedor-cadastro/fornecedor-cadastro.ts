import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Fornecedor } from '../../modelos/fornecedor';
import { FornecedorServiceProvider } from '../../providers/fornecedor-service/fornecedor-service';

@IonicPage()
@Component({
  selector: 'page-fornecedor-cadastro',
  templateUrl: 'fornecedor-cadastro.html',
})
export class FornecedorCadastroPage {
  
  public fornecedor: Fornecedor;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _fornecedorService: FornecedorServiceProvider,
    private _alertCtrl: AlertController
  ) {
    this.fornecedor = new Fornecedor();
  }

  salvarfornecedor(fornecedor){
    this._fornecedorService.salvar(fornecedor)
    .subscribe(
      () => {
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
              this.navCtrl.pop();
              } 
            }
          ]
        }).present();
      },
    (err:Error) => {
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
