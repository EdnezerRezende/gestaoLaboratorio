import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Produto } from '../../modelos/produtos';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';


@IonicPage()
@Component({
  selector: 'page-produto-cadastro',
  templateUrl: 'produto-cadastro.html',
})
export class ProdutoCadastroPage {

  public produto: Produto;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _produtoServiceProvider: ProdutoServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
  ) {
    this.produto = new Produto();
  }

  ionViewDidLoad() {
  }
  
  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  salvarProduto(){
    let loading = this.obterLoading();
    loading.present();
    this._produtoServiceProvider.salvar(this.produto)
    .subscribe(
      () => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Produto inserido! Deseja inserir mais produtos ? ',
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
    this.produto.categoria = "";
    this.produto.codigoProduto = "";
    this.produto.descricao = "";
    this.produto.nome = "";
  }
}
