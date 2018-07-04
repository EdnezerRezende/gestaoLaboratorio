import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Fornecedor } from '../../modelos/fornecedor';
import { FornecedorServiceProvider } from '../../providers/fornecedor-service/fornecedor-service';

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
    private _alertCtrl: AlertController) {
      this.obterFornecedores();
  }

  copiaListaFornecedores(){
    return this.fornecedores;
  }

  obterFornecedores(){
    this._FornecedoresService.obterFornecedores()
    .subscribe(
      (listaFornecedores)=> 
       { 
         this.fornecedores = listaFornecedores;
         this.fornecedoresSearch = listaFornecedores;
      },
      (err:Error) => {
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

  deletarFornecedor(fornecedor){
    this._FornecedoresService.deletarFornecedor(fornecedor.id)
      .subscribe(() => {
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
