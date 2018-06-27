import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Produto } from '../../modelos/produtos';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';


@IonicPage()
@Component({
  selector: 'page-cadastro-produto',
  templateUrl: 'cadastro-produto.html',
})
export class CadastroProdutoPage {

  public produto: Produto;
  public codigoProduto:string;
  public nome:string;
  public descricao:string;
  public categoria:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _produtoServiceProvider: ProdutoServiceProvider
  ) {
  }

  ionViewDidLoad() {
  }
  
  salvarProduto(){
    this.produto.categoria = this.categoria;
    this.produto.codigoProduto = this.codigoProduto;
    this.produto.descricao = this.descricao;
    this.produto.nome = this.nome;
    console.log(this.produto);
    this._produtoServiceProvider.salvar(this.produto)
    .subscribe(
      () => console.log("Realizado com sucesso!")
    );
  }


}
