import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProdutoServiceProvider } from '../providers/produto-service/produto-service';
import { HttpClientModule } from '@angular/common/http';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/operators/catchError';
import 'rxjs/operators/retry';


import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { HttpRestServiceProvider } from '../providers/http-rest-service/http-rest-service';
import { FornecedorServiceProvider } from '../providers/fornecedor-service/fornecedor-service';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { EstoqueServiceProvider } from '../providers/estoque-service/estoque-service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'md-transition  ',
      menuType: 'overlay'
    }),
    BrMaskerModule
  ],
  exports:[
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    CommonModule,
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProdutoServiceProvider,
    UsuariosServiceProvider,
    HttpRestServiceProvider,
    FornecedorServiceProvider,
    EstoqueServiceProvider,
    NativePageTransitions
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
