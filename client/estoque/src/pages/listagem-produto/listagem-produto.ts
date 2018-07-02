import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { Produto } from '../../modelos/produtos';


@IonicPage()
@Component({
  selector: 'page-listagem-produto',
  templateUrl: 'listagem-produto.html',
})
export class ListagemProdutoPage {

  produtos: Produto[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _produtoServiceProvider: ProdutoServiceProvider) {
  }

  ionViewDidLoad() {
    this._produtoServiceProvider.obterProdutos()
    .subscribe((listaProdutos)=> this.produtos = listaProdutos);
    console.log(this.produtos);
  }

}
