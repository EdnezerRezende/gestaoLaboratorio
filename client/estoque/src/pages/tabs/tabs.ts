import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EstoqueListagemPage } from '../estoque-listagem/estoque-listagem';
import { HomePage } from '../home/home';
import { EstoqueCadastroFormularioPage } from '../estoque-cadastro-formulario/estoque-cadastro-formulario';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { EstoquePesquisarPage } from '../estoque-pesquisar/estoque-pesquisar';
import { EstoqueListagemConsolidadaPage } from '../estoque-listagem-consolidada/estoque-listagem-consolidada';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1;
  tab2;
  tabhome;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private _nativePageTransitions: NativePageTransitions) {
    this._nativePageTransitions.fade(null);
    this.tabhome = HomePage;
    this.tab1 = EstoquePesquisarPage.name;
    this.tab2 = EstoqueListagemConsolidadaPage.name;
  }

  public doChange(ev:any) {
		if (ev.length()>1) {
			ev.popToRoot();
		 }
	}
}
