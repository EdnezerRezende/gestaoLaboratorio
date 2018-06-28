import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EstoqueCadastroPage } from '../estoque-cadastro/estoque-cadastro';
import { EstoqueListagemPage } from '../estoque-listagem/estoque-listagem';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  produtos: string = "Calibrador";
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams
    ) {

  }

  direcionaPagina(pagina:string){
    if (pagina == "inserir"){
      this.navCtrl.push(EstoqueCadastroPage.name);
    }else{
      this.navCtrl.push(EstoqueListagemPage.name);
    }
  }

 


}
