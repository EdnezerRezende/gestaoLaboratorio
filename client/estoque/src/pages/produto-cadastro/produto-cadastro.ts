import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Produto } from '../../modelos/produtos';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { CategoriaServiceProvider } from '../../providers/categoria-service/categoria-service';
import { Categoria } from '../../modelos/categoria';


@IonicPage()
@Component({
  selector: 'page-produto-cadastro',
  templateUrl: 'produto-cadastro.html',
})
export class ProdutoCadastroPage {

  public produto: Produto;
  private formulario: FormGroup;
  public categorias: Categoria[];

  public categoriaSelecionada: Categoria;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _produtoServiceProvider: ProdutoServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private _categoriaServiceProvider: CategoriaServiceProvider
  ) {
    this.criarFormulario();

    this.produto = new Produto();
    this.produto.codigoProduto = '';
    this.produto.categoria = new Categoria();
    this.produto.nome = '';
    this.produto.categoria.nomeCategoria = '';

    
    if (this.navParams.get('produto')){
      this.produto = this.navParams.get('produto');
      this.categoriaSelecionada = this.produto.categoria;
    }
    
  }

  ionViewWillEnter(){
    this.obterCategorias();
  }

  obterCategorias(){
    let loading = this.obterLoading();
    loading.present();
    this._categoriaServiceProvider.obterCategorias()
    .subscribe(
      (listaCategorias)=> 
       { 
         loading.dismiss();
         console.log(listaCategorias);
         this.categorias = listaCategorias;
      },
      (err:Error) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha',
          subTitle: 'Não foi possível obter a Lista de categorias, tente novamente mais tarde!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
        this.navCtrl.goToRoot;
    });
  }
  criarFormulario(){
    this.formulario = this.formBuilder.group({
      codigoProduto: ['', [Validators.required]],//, Validators.pattern("^\d1[0-9]+d1[a-zA-Z]+\d2[0-9]+\-\d2[0-9]$")
      nome: ['', [Validators.required]],//, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
      descricao: ['', [Validators.required] ],
      categoria: ['', Validators.required],
      qtdMinimaEstoque: ['', Validators.required]
    });
  }

  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  salvarProduto(){
    let loading = this.obterLoading();
    loading.present();
    this.produto.codigoProduto = this.produto.codigoProduto.replace("-", "");
    
    this.produto.categoria = this.categoriaSelecionada;
    
    this._produtoServiceProvider.salvar(this.produto)
    .subscribe(
      () => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Produto inserido! Deseja inserir mais produtos ? ',
          buttons: [
            {
              text: 'Sim', 
              handler: ()=> {
                this.limparCamposFormulario();
              }
            },
            { text: 'Não', 
              handler: ()=>{
              this.navCtrl.pop();
              } 
            }
          ]
        }).present();
      },
    (err) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha de cadastro',
          subTitle: err.error.message,
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      }
    );
  }


  limparCamposFormulario(){
    this.produto.categoria.nomeCategoria = "";
    this.produto.codigoProduto = "";
    this.produto.descricao = "";
    this.produto.nome = "";
    this.criarFormulario();
  }

  compareFn(e1: Categoria, e2: Categoria): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }
}
