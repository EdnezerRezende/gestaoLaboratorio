import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { EstoqueServiceProvider } from '../../providers/estoque-service/estoque-service';
import { Produto } from '../../modelos/produtos';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { PedidosServiceProvider } from '../../providers/pedidos-service/pedidos-service';
import { CategoriaServiceProvider } from '../../providers/categoria-service/categoria-service';
import { Categoria } from '../../modelos/categoria';


@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {

  produtos: Produto[];
  categorias: Categoria[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _ItemEstoqueService: EstoqueServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _usuarioService: UsuariosServiceProvider,
    private _categoriasService: CategoriaServiceProvider,
    private _pedidosService: PedidosServiceProvider
   ) {
  }

  ionViewWillEnter(){
    this.obterCategorias();
    this.obterProdutos();
  }

  copiaListaProdutos(){
    return this.produtos;
  }
  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  obterCategorias(){
    this._categoriasService.obterCategorias()
    .subscribe(
      (listaCategorias) =>
      {
        this.categorias = listaCategorias;
        console.log(this.categorias);
      }, 
      (err:Error) => {
        this._alertCtrl.create({
          title: 'Falha',
          subTitle: 'Não foi possível obter a Lista de Categorias, tente novamente mais tarde!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
      }
    )
  }

  obterProdutos(){
    let loading = this.obterLoading();
    loading.present();
    this._pedidosService.obterPedidos()
    .subscribe(
      (listaProdutos)=> 
       { 
         loading.dismiss();
         this.produtos = listaProdutos;

         if (this.produtos.length == 0){
          
          this._alertCtrl.create({
            title: 'Observação',
            subTitle: 'No momento não encontramos nenhum produto a ser solicitado, \nquantidades mínimas estão supridas.',
            buttons: [
              {
                text: 'Ok',
                handler: ()=> {
                  this.navCtrl.pop();
                }
              }
            ]
          }).present();
         }
      },
      (err:Error) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha',
          subTitle: 'Não foi possível obter a Lista de Pedidos, tente novamente mais tarde!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
        this.navCtrl.goToRoot;
    });
  }

  enviarPedido(){
    let loading = this.obterLoading();
    this._alertCtrl.create({
      title: 'E-mail Fornecedor',
      subTitle: 'Por favor, informe o e-mail do fornecedor',
      inputs:[
        {
          name: 'email',
          placeholder: 'E-mail'
        }
      ],
      buttons: [
        {
          text: 'Enviar',
          handler: data => {
            if(data.email != '' ){
              
              loading.present();

              this._pedidosService.enviarEmail(this._usuarioService.obtemUsuarioLogado(), data.email)
              .subscribe(
                (envioPedido)=>
                       {
                        loading.dismiss();
                        this._alertCtrl.create({
                          title: 'Sucesso',
                          subTitle: 'Pedido enviado com sucesso! Uma cópia do e-mail foi enviado para você.',
                          buttons: [
                            {
                              text: 'Ok'
                            }
                          ]
                        }).present();
                       },
                       (err:Error) => {
                        loading.dismiss();
                        this._alertCtrl.create({
                          title: 'Falha',
                          subTitle: 'Não foi possível Enviar o pedido, tente novamente mais tarde!',
                          buttons: [
                            {
                              text: 'Ok'
                            }
                          ]
                        }).present();
              });

            }else{
              loading.dismiss();
              this._alertCtrl.create({
                title: 'E-mail Não Informado',
                subTitle: 'Não foi informado e-mail, favor informar um e clicar em enviar!',
                buttons: [
                  {
                    text: 'Ok'
                  }
                ]
              }).present();
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    }).present();
    
  }

}
