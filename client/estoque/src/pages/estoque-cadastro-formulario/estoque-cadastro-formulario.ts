import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemEstoque } from '../../modelos/itemEstoque';

@IonicPage()
@Component({
  selector: 'page-estoque-cadastro-formulario',
  templateUrl: 'estoque-cadastro-formulario.html',
})
export class EstoqueCadastroFormularioPage {
  public itemEstoque:ItemEstoque;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.itemEstoque = new ItemEstoque();
    if ( this.navParams.get('codigo') ){
      // obter dados do registro no servidor e retornar o item caso exista.
      this.itemEstoque = this.navParams.get('codigo');
      // perguntar se deseja marcar utilização caso ainda esteja na validade e quantidade de utilização disponivel
      // ou se deseja baixar do estoque.
      // se não existir, apenas permitir cadastro.
    }

  }

  registrarItem(){
    // enviarItem para o servidor 
    // caso exista, 
    // perguntar se deseja marcar utilização caso ainda esteja na validade e quantidade de utilização disponivel
    // ou se deseja baixar do estoque.
    // se não existir, apenas permitir cadastro.
  }

}
