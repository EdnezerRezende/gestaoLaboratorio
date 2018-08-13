import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ItemEstoque } from '../../modelos/itemEstoque';
import { EstoqueServiceProvider } from '../../providers/estoque-service/estoque-service';


@IonicPage()
@Component({
  selector: 'page-estoque-listagem',
  templateUrl: 'estoque-listagem.html',
})
export class EstoqueListagemPage {
  itensEstoque: ItemEstoque[];
  itensEstoqueSearch: ItemEstoque[];
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _ItemEstoqueService: EstoqueServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {
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
    this._ItemEstoqueService.obterEstoque()
    .subscribe(
      (listaItemEstoque)=> 
       { 
         loading.dismiss();
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

  deletarItemEstoque(itemEstoque:ItemEstoque){
    this._alertCtrl.create({
      title:'Confirmar',
      subTitle:'Deseja deletar o item ' + itemEstoque.produto.codigoProduto + ' - ' + itemEstoque.produto.nome + '?', 
      buttons:[
        {
          text: 'Sim', handler: ()=> {
            this.deletarItemEstoqueConfirmado(itemEstoque);
          }
        },
        {
          text: 'Não'
        }
    ]
    }).present();
  }

  deletarItemEstoqueConfirmado(itemEstoque:ItemEstoque){
    let loading = this.obterLoading();
    loading.present();
    this._ItemEstoqueService.deletarItemEstoque(itemEstoque.id)
      .subscribe(() => {
        loading.dismiss();
        let novosItensEstoque = this.itensEstoque.slice(0);
        let indice = novosItensEstoque.indexOf(itemEstoque);
        novosItensEstoque.splice(indice, 1);
        this.itensEstoque = novosItensEstoque;
        this.itensEstoqueSearch = this.copiaListaItensEstoque();

        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Item ' + itemEstoque.produto.codigoProduto + ' excluído com sucesso!',
          buttons:[
            {text: 'Ok'}
          ]
        }).present();
      },
      (err) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha',
          subTitle: err.error.message,
          buttons:[{text: 'Ok'}]
        }).present();
      })
  }

  getItems(ev: any) {
    this.itensEstoqueSearch = this.copiaListaItensEstoque();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.itensEstoqueSearch = this.itensEstoqueSearch.filter((item) => {
        return (item.produto.nome.toLowerCase().indexOf(val.toLowerCase()) > -1 
        || item.produto.codigoProduto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
