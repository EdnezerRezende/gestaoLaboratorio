import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Produto } from '../../modelos/produtos';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-produto-cadastro',
  templateUrl: 'produto-cadastro.html',
})
export class ProdutoCadastroPage {

  public produto: Produto;
  private formulario: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _produtoServiceProvider: ProdutoServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.criarFormulario();

    this.produto = new Produto();

    if (this.navParams.get('produto')){
      this.produto = this.navParams.get('produto');
    }
    
  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      codigoProduto: ['', Validators.required],
      nome: ['', [Validators.required]],//, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
      descricao: ['', [Validators.required] ],
      categoria: ['', Validators.required],
      qtdMaximoUtilizacao: ['', Validators.required],
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
    this.produto.categoria = "";
    this.produto.codigoProduto = "";
    this.produto.descricao = "";
    this.produto.nome = "";
    this.criarFormulario();
  }
}
