import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  scanData : {};
  options :BarcodeScannerOptions;

  produtos: string = "Calibrador";
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _barcodeScanner: BarcodeScanner) {

  }

  scan(){
    this.options = {
        prompt : "Scan your barcode "
    }
    this._barcodeScanner.scan(this.options).then((barcodeData) => {
        console.log(barcodeData);
        this.scanData = barcodeData;
    }, (err) => {
        console.log("Error occured : " + err);
    });         
}    


}
