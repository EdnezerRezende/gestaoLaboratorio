import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ItemEstoque } from '../../modelos/itemEstoque';
import { EstoqueServiceProvider } from '../../providers/estoque-service/estoque-service';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { Produto } from '../../modelos/produtos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  private formulario: FormGroup;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _ItemEstoqueService: EstoqueServiceProvider,
    private _loadingCtrl: LoadingController,
    private _produtosService: ProdutoServiceProvider,
    private _alertCtrl: AlertController,
    private formBuilder: FormBuilder) {

      this.criarFormulario();

      this.produtos = new Array<Produto>();
      this.itemEstoque = new ItemEstoque;
      this.obterProdutos();
  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      produto: ['', Validators.required],
      localEstoque: ['', [Validators.required]],
      lote: ['', [Validators.required] ],
      dataPedido: ['', Validators.required],
      dataValidade: ['', Validators.required]
    });
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
         this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Foi cadastrado com sucesso!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
         this.itemEstoque = new ItemEstoque();
         this.criarFormulario();
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
