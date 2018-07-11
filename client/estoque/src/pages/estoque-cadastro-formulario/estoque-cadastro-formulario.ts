import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ItemEstoque } from '../../modelos/itemEstoque';
import { EstoqueServiceProvider } from '../../providers/estoque-service/estoque-service';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { Produto } from '../../modelos/produtos';

@IonicPage()
@Component({
  selector: 'page-estoque-cadastro-formulario',
  templateUrl: 'estoque-cadastro-formulario.html',
})
export class EstoqueCadastroFormularioPage {
  itensEstoque: ItemEstoque[];
  itensEstoqueSearch: ItemEstoque[];
  produtos: Produto[];
  searchQuery: string = '';
  itemEstoque:ItemEstoque;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _ItemEstoqueService: EstoqueServiceProvider,
    private _loadingCtrl: LoadingController,
    private _produtosService: ProdutoServiceProvider,
    private _alertCtrl: AlertController) {
      this.produtos = new Array<Produto>();
      this.itemEstoque = new ItemEstoque;
      this.obterProdutos();
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  obterProdutos(){
    let loading = this.obterLoading();
    loading.present();
    this._produtosService.obterProdutos()
    .subscribe(
      (listaProdutos)=> 
      { 
        loading.dismiss();
        this.produtos = listaProdutos;
        console.log(this.produtos);
     },
     (err:Error) => {
       loading.dismiss();
       this._alertCtrl.create({
         title: 'Falha',
         subTitle: 'Não foi possível obter a Lista de Produtos, tente novamente mais tarde!',
         buttons: [
           {
             text: 'Ok'
           }
         ]
       }).present();
   });
  }

  salvarItemEstoque(){
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

  compareProduto(e1: Produto, e2: Produto): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  registrarItem(){
    // enviarItem para o servidor 
    // caso exista, 
    // perguntar se deseja marcar utilização caso ainda esteja na validade e quantidade de utilização disponivel
    // ou se deseja baixar do estoque.
    // se não existir, apenas permitir cadastro.
  }

}
