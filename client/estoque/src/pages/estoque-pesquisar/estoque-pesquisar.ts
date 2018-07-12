import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ItemEstoque } from '../../modelos/itemEstoque';
import { EstoqueServiceProvider } from '../../providers/estoque-service/estoque-service';
import { Produto } from '../../modelos/produtos';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { Validacoes } from '../../util/validacoes';

@IonicPage()
@Component({
  selector: 'page-estoque-pesquisar',
  templateUrl: 'estoque-pesquisar.html',
})
export class EstoquePesquisarPage {
  itensEstoque: ItemEstoque[];
  itensEstoqueSearch: ItemEstoque[];
  produtos: Produto[];
  searchQuery: string = '';
  itemEstoque:ItemEstoque;
  mostrarForm: boolean = false;
  somarVlrQtd:number;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _ItemEstoqueService: EstoqueServiceProvider,
    private _loadingCtrl: LoadingController,
    private _produtosService: ProdutoServiceProvider,
    private _alertCtrl: AlertController) {
      this.itemEstoque = new ItemEstoque();
      this.itensEstoque = new Array<ItemEstoque>();
      this.produtos = new Array<Produto>();

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
         this.itensEstoque.forEach(element => {
           this.produtos.push(element.produto);
         });
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
    });
  }

  editarItemEstoque(itemEstoque:ItemEstoque){

    if ( this.itemEstoque.id == itemEstoque.id ){
      this.mostrarForm = false;
      this.itemEstoque = new ItemEstoque();
    }else{
      this.itemEstoque = itemEstoque;
      this.somarVlrQtd = this.itemEstoque.qtdUtilizado + 1;
      this.mostrarForm = true;
    }
  }

  atualizarItemEstoque(){
    this.itemEstoque.qtdUtilizado = this.somarVlrQtd;
    let loading = this.obterLoading();
    loading.present();
    this._ItemEstoqueService.salvar(this.itemEstoque)
    .subscribe(
      ()=> 
       { 
         loading.dismiss();
      },
      (err:Error) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha',
          subTitle: 'Não foi possível atualizar o Item informado, tente novamente mais tarde!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
    });
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

  compareFn(e1: ItemEstoque, e2: ItemEstoque): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }
  compareProduto(e1: Produto, e2: Produto): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

}
