import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { EstoqueServiceProvider } from '../../providers/estoque-service/estoque-service';
import { ItemEstoque } from '../../modelos/itemEstoque';
import { EstoqueTotal } from '../../modelos/estoqueTotal';

@IonicPage()
@Component({
  selector: 'page-estoque-listagem-consolidada',
  templateUrl: 'estoque-listagem-consolidada.html',
})
export class EstoqueListagemConsolidadaPage {

  itensEstoque: EstoqueTotal[];
  itensEstoqueSearch: EstoqueTotal[];
  searchQuery: string = '';
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _ItemEstoqueService: EstoqueServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {
  }

  ionViewWillEnter(){
    this.obterItensEstoque();
  }

  copiaListaItensEstoque(){
    return this.itensEstoque;
  }
  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  obterItensEstoque(){
    let loading = this.obterLoading();
    loading.present();
    this._ItemEstoqueService.obterEstoqueTotal()
    .subscribe(
      (listaItemEstoque)=> 
       { 
         loading.dismiss();
         console.log(listaItemEstoque);
         this.itensEstoque = listaItemEstoque;
         this.itensEstoqueSearch = listaItemEstoque;
      },
      (err:Error) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha',
          subTitle: 'Não foi possível obter a Lista de Estoque, tente novamente mais tarde!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
        this.navCtrl.goToRoot;
    });
  }

  getItems(ev: any) {
    this.itensEstoqueSearch = this.copiaListaItensEstoque();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.itensEstoqueSearch = this.itensEstoqueSearch.filter((item) => {
        return (item.nomeProduto.toLowerCase().indexOf(val.toLowerCase()) > -1 
        || item.codigo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
