import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { Produto } from '../../modelos/produtos';


@IonicPage()
@Component({
  selector: 'page-listagem-produto',
  templateUrl: 'listagem-produto.html',
})
export class ListagemProdutoPage {

  produtos: Produto[];
  produtosSearch: Produto[];
  searchQuery: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _produtoServiceProvider: ProdutoServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {
      this.obterProdutos();
  }
  copiaListaProdutos(){
    return this.produtos;
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  obterProdutos(){
    let loading = this.obterLoading();
    loading.present();
    this._produtoServiceProvider.obterProdutos()
    .subscribe(
      (listaProdutos)=> {
        loading.dismiss();
        this.produtos = listaProdutos; this.produtosSearch = listaProdutos;
      },
      (err:Error) => {
        loading.dismiss();
        console.log(err.message);
        this._alertCtrl.create({
          title: 'Falha',
          subTitle: 'Não foi possível obter a Lista de Produtos, tente novamente mais tarde!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
    });
  }

  deletarProduto(produto){
    let loading = this.obterLoading();
    loading.present();
    this._produtoServiceProvider.deletarProduto(produto.id)
      .subscribe(() => {
        loading.dismiss();
        let novosProdutos = this.produtos.slice(0);
        let indice = novosProdutos.indexOf(produto);
        novosProdutos.splice(indice, 1);
        this.produtos = novosProdutos;
        this.produtosSearch = this.copiaListaProdutos();

        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Produto ' + produto.nome + ' excluído com sucesso!',
          buttons:[
            {text: 'Ok'}
          ]
        }).present();
      },
      (err:Error) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha',
          subTitle: err.message,
          buttons:[{text: 'Ok'}]
        }).present();
      })
  }

  getItems(ev: any) {
    this.produtosSearch = this.copiaListaProdutos();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.produtosSearch = this.produtosSearch.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
