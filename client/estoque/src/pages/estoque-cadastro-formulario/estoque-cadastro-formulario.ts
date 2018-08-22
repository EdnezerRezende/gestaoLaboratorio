import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ItemEstoque } from '../../modelos/itemEstoque';
import { EstoqueServiceProvider } from '../../providers/estoque-service/estoque-service';
import { ProdutoServiceProvider } from '../../providers/produto-service/produto-service';
import { Produto } from '../../modelos/produtos';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import moment from 'moment';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DatePicker } from '@ionic-native/date-picker';

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
  dataPedido;
  dataValidade;
  localArmazenamento: any[];

  options :BarcodeScannerOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _ItemEstoqueService: EstoqueServiceProvider,
    private _loadingCtrl: LoadingController,
    private _produtosService: ProdutoServiceProvider,
    private _alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private _datePicker: DatePicker,
    private _barcodeScanner: BarcodeScanner) {

      this.criarFormulario();

      this.produtos = new Array<Produto>();
      this.itemEstoque = new ItemEstoque;
      this.itemEstoque.lote = "";
      this.localArmazenamento = [{local: "FREEZER"}, {local: "EXTERNO"}];
      this.obterProdutos();

      if(this.navParams.get('itemEstoque')){
        this.itemEstoque = this.navParams.get('itemEstoque'); 
        this.converterDataParaIsoString(this.itemEstoque.dataPedido, this.itemEstoque.dataValidade);
      }
  }

  converterDataParaIsoString(dataPedido:Date, dataValidade:Date) {
    this.dataPedido = moment(dataPedido).subtract(1, 'month').toISOString();
    this.dataValidade = moment(dataValidade).subtract(1, 'month').toISOString();
  }

  converterDataParaIsoStringCadastro(dataValidade:Date) {
    this.dataValidade = moment(dataValidade).toISOString();
  }

  criarFormulario(){
    this.formulario = this.formBuilder.group({
      produto: ['', Validators.required],
      localEstoque: ['', [Validators.required]],
      lote: ['', [Validators.required] ],
      // dataPedido: [{value: '', disabled: true}] ,
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
    this.itemEstoque.dataPedido = this.dataPedido;
    this.itemEstoque.dataValidade = this.dataValidade;
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
        
        if (this.itemEstoque.id != undefined){
          this.navCtrl.pop();
        }

        this.itemEstoque = new ItemEstoque();
        this.criarFormulario();
      },
      (err) => {
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Mensagem',
          subTitle: err.error.message,
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

  pesquisarScan(){
    this.options = {
        prompt : "Scaneando... "
    }
    this._barcodeScanner.scan(this.options).then((barcodeData) => {
        let itemEstoque: ItemEstoque = new ItemEstoque();
        itemEstoque.produto = new Produto();
        if ( barcodeData.format == 'CODE_128'){
          let textoCodigo = barcodeData.text.split(" ");

          itemEstoque.produto.codigoProduto = textoCodigo[0];
          
          itemEstoque.lote = textoCodigo[1].trim();
          
          let dataValidade = textoCodigo[2].split("/");
          let dataValidade2 = moment(dataValidade[2].substr(0,4)+ "-"+ dataValidade[1]+"-"+ dataValidade[0]).add(1, 'days').format('YYYY-MM-DD');

          itemEstoque.dataValidade = new Date(dataValidade2);

          this.verificarItens(itemEstoque);

        } else if ( barcodeData.format == 'DATA_MATRIX' ){
                     
          itemEstoque.lote = barcodeData.text.substr(19,9);
          let dataValidade = "20" + barcodeData.text.substr(30, 6);
          itemEstoque.produto.codigoProduto = barcodeData.text.substr(39, 11);
          dataValidade = moment(dataValidade.substr(0,4)+ "-"+ dataValidade.substr(4,2)+"-"+ dataValidade.substr(6,2)).add(1, 'days').format('YYYY-MM-DD');
          itemEstoque.dataValidade = new Date(dataValidade);
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

    // let itemComProduto: ItemEstoque;
    
    this.produtos.forEach(element => {
      let codigoProduto:string = element.codigoProduto.replace('-', '');
      
      if ( codigoProduto == itemEstoque.produto.codigoProduto){
        itemEstoque.produto = element;
      }
    });

    if ( itemEstoque.produto.id == undefined){
      this._alertCtrl.create({
        title: 'Produto Não Encontrado',
        subTitle: 'Não encontramos o produto deste item, favor cadastrá-lo!',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      }).present();
    }
    return itemEstoque;
  }
  

  registrarItem(){
    // enviarItem para o servidor 
    // caso exista, 
    // perguntar se deseja marcar utilização caso ainda esteja na validade e quantidade de utilização disponivel
    // ou se deseja baixar do estoque.
    // se não existir, apenas permitir cadastro.
  }

  selecionaData(){
    this._datePicker.show({
      date: new Date(),
      mode: 'date'
    })
    .then(
      data => this.dataValidade = data.toISOString());
  }

}
