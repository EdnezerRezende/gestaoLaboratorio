import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListagemProdutoPage } from '../listagem-produto/listagem-produto';
import { ProdutoCadastroPage } from '../produto-cadastro/produto-cadastro';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  direcionaPagina(pagina:string){
    if (pagina == "cadastro"){
      this.navCtrl.push(ProdutoCadastroPage.name);
    }else{
      this.navCtrl.push(ListagemProdutoPage.name);
    }
  }
}
