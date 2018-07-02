import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstoqueCadastroPage } from '../estoque-cadastro/estoque-cadastro';
import { EstoqueListagemPage } from '../estoque-listagem/estoque-listagem';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1;
  tab2;
  tabhome;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabhome = HomePage;
    this.tab1 = EstoqueCadastroPage.name;
    this.tab2 = EstoqueListagemPage.name;
  }
}
