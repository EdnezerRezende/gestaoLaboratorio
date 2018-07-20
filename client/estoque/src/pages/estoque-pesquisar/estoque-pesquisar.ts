import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ItemEstoque } from '../../modelos/itemEstoque';
import { EstoqueServiceProvider } from '../../providers/estoque-service/estoque-service';
import { Produto } from '../../modelos/produtos';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { Validacoes } from '../../util/validacoes';
import { EstoqueCadastroFormularioPage } from '../estoque-cadastro-formulario/estoque-cadastro-formulario';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner';

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

  options :BarcodeScannerOptions;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _ItemEstoqueService: EstoqueServiceProvider,
    private _loadingCtrl: LoadingController,
    private _produtosService: ProdutoServiceProvider,
    private _alertCtrl: AlertController,
    private _barcodeScanner: BarcodeScanner) {
      this.itemEstoque = new ItemEstoque();
      this.itensEstoque = new Array<ItemEstoque>();
      this.produtos = new Array<Produto>();

  }

  ionViewWillEnter(){
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
    this.navCtrl.push(EstoqueCadastroFormularioPage.name, {itemEstoque: itemEstoque});
    
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
         this._alertCtrl.create({
          title: 'Sucesso',
          subTitle: 'Foi atualizado com sucesso!',
          buttons: [
            {
              text: 'Ok'
            }
          ]
        }).present();
         this.mostrarForm = false;
         this.itemEstoque = new ItemEstoque();
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

  pesquisarScan(){
    this.options = {
        prompt : "Scaneando... "
    }
    this._barcodeScanner.scan(this.options).then((barcodeData) => {
        let itemEstoque: ItemEstoque = new ItemEstoque();
        itemEstoque.produto = new Produto();
        if ( barcodeData.format == 'CODE_128'){
          let textoCodigo = barcodeData.text.split(" ");
          let lote:any;

          itemEstoque.produto.codigoProduto = textoCodigo[0].substr(1,textoCodigo[0].length);
          
          lote = textoCodigo[1].split("17 ");
          itemEstoque.lote = lote[0].substr(0, lote[0].length-2);
          
          let dataValidade = textoCodigo[2].split("/");
          itemEstoque.dataValidade = new Date(dataValidade[2]+ "-"+ dataValidade[1]+"-"+ dataValidade[0]);

          this.verificarItens(itemEstoque);

        } else if ( barcodeData.format == 'DATA_MATRIX' ){
          // tratar o outro código de barras 
          alert("Você usou outro código");
          alert(barcodeData.text);

          this.verificarItens(itemEstoque);

        } else { 
          this._alertCtrl.create({
            title: 'Formato Inválido',
            subTitle: 'O código lido não corresponde aos padrões estabelecidos!',
            buttons: [
              {
                text: 'Ok'
              }
            ]
          }).present();
        }
    }, (err) => {
        console.log("Error occured : " + err);
    });         
}    

  verificarItens(itemEstoque: ItemEstoque){
    this.itensEstoque.forEach(element => {
      if ( element.produto.codigoProduto == itemEstoque.produto.codigoProduto && element.lote == itemEstoque.lote){
          itemEstoque = element;
          this.editarItemEstoque(itemEstoque);
      } 
    });

    this._alertCtrl.create({
      title: 'Não Encontrado',
      subTitle: 'Este item não foi localizado dentro do estoque, favor cadastra-lo',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    }).present();
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
