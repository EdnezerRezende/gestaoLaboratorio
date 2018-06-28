import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Produto } from '../../modelos/produtos';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';


@IonicPage()
@Component({
  selector: 'page-produto-cadastro',
  templateUrl: 'produto-cadastro.html',
})
export class ProdutoCadastroPage {

  public produto: Produto;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _produtoServiceProvider: ProdutoServiceProvider,
    private _alertCtrl: AlertController,
  ) {
    this.produto = new Produto();
  }

  ionViewDidLoad() {
  }
  
  salvarProduto(){
    
    this._produtoServiceProvider.salvar(this.produto)
    .subscribe(
      () => {
        this.produto = new Produto();

        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Produto inserido! Deseja inserir mais produtos ? ',
          buttons: [
            {
              text: 'Sim'
            },
            { text: 'Não', 
              handler: ()=>{
              this.navCtrl.pop();
              } 
            }
          ]
        }).present();
      }
    );
  }


}
