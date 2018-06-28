import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner';
import { EstoqueCadastroFormularioPage } from '../estoque-cadastro-formulario/estoque-cadastro-formulario';


@IonicPage()
@Component({
  selector: 'page-estoque-cadastro',
  templateUrl: 'estoque-cadastro.html',
})
export class EstoqueCadastroPage {
  scanData : {};
  options :BarcodeScannerOptions;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
  }

  scan(){
    this.options = {
        prompt : "Scan your barcode "
    }
    this._barcodeScanner.scan(this.options).then((barcodeData) => {
        console.log(barcodeData);
        this.scanData = barcodeData;
        this.navCtrl.push(EstoqueCadastroFormularioPage.name, {
          codigo:this.scanData
        });
    }, (err) => {
        console.log("Error occured : " + err);
    });         
  }    

  inserirManualmente(){
    this.navCtrl.push(EstoqueCadastroFormularioPage.name);
  }

}
