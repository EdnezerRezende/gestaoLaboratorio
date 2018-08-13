import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Fornecedor } from '../../modelos/fornecedor';
import { FornecedorServiceProvider } from '../../providers/fornecedor-service/fornecedor-service';
import { Validacoes } from '../../util/validacoes';

@IonicPage()
@Component({
  selector: 'page-fornecedor-listagem',
  templateUrl: 'fornecedor-listagem.html',
})
export class FornecedorListagemPage {

  fornecedores: Fornecedor[];
  fornecedoresSearch: Fornecedor[];
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _FornecedoresService: FornecedorServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {
      this.obterFornecedores();
  }

  copiaListaFornecedores(){
    return this.fornecedores;
  }
  obterLoading(){
    return this._loadingCtrl.create({
      content: 'Carregando...'
    });
  }

  obterFornecedores(){
    let loading = this.obterLoading();
    loading.present();
    this._FornecedoresService.obterFornecedores()
    .subscribe(
      (listaFornecedores)=> 
       { 
         loading.dismiss();
         this.fornecedores = listaFornecedores;
         this.fornecedoresSearch = listaFornecedores;
      },
      (err:Error) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha',
          subTitle: 'Não foi possível obter a Lista de Fornecedores, tente novamente mais tarde!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
    });
  }

  deletarFornecedor(fornecedor: Fornecedor){
    this._alertCtrl.create({
      title:'Confirmar',
      subTitle:'Deseja deletar o item ' + fornecedor.nomeFornecedor + '?', 
      buttons:[
        {
          text: 'Sim', handler: ()=> {
            this.deletarFornecedorConfirmado(fornecedor);
          }
        },
        {
          text: 'Não'
        }
    ]
    }).present();
  }

  deletarFornecedorConfirmado(fornecedor){
    let loading = this.obterLoading();
    loading.present();
    this._FornecedoresService.deletarFornecedor(fornecedor.id)
      .subscribe(() => {
        loading.dismiss();
        let novosFornecedores = this.fornecedores.slice(0);
        let indice = novosFornecedores.indexOf(fornecedor);
        novosFornecedores.splice(indice, 1);
        this.fornecedores = novosFornecedores;
        this.fornecedoresSearch = this.copiaListaFornecedores();

        this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Fornecedor ' + fornecedor.nomeFornecedor + ' excluído com sucesso!',
          buttons:[
            {text: 'Ok'}
          ]
        }).present();
      },
      (err:Error) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Falha',
          subTitle: err.message,
          buttons:[{text: 'Ok'}]
        }).present();
      })
  }

  getItems(ev: any) {
    this.fornecedoresSearch = this.copiaListaFornecedores();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.fornecedoresSearch = this.fornecedoresSearch.filter((item) => {
        return (item.nomeFornecedor.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }



}
