import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FornecedorCadastroPage } from '../fornecedor-cadastro/fornecedor-cadastro';
import { FornecedorListagemPage } from '../fornecedor-listagem/fornecedor-listagem';

@IonicPage()
@Component({
  selector: 'page-fornecedor',
  templateUrl: 'fornecedor.html',
})
export class FornecedorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

   direcionaPagina(pagina:string){
    if (pagina == "cadastro"){
      this.navCtrl.push(FornecedorCadastroPage.name);
    }else{
      this.navCtrl.push(FornecedorListagemPage.name);
    }
  }

}
