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

  id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _barcodeScanner: BarcodeScanner) {
  }
    
  ionViewDidLoad(){
    this.scan();
  }

  scan(){
    this.options = {
        showTorchButton: true,
        prompt : "Aponte para o Código",
        resultDisplayDuration: 500,
        torchOn: false,
        showFlipCameraButton: true
    };
    this._barcodeScanner.scan(this.options)
      .then((barcodeData) => {
        this.scanData = barcodeData;
        this.navCtrl.push(EstoqueCadastroFormularioPage.name, {
          codigo:this.scanData
        });

      }, (err:Error) => {
        alert(err);
        this.navCtrl.push(EstoqueCadastroFormularioPage.name);    
        console.log("Error occured : " + err);
      }
    ); 
  }    

  inserirManualmente(){
    this.navCtrl.push(EstoqueCadastroFormularioPage.name);
  }

}
