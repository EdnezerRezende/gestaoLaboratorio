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
import { AuthProvider } from '../providers/auth/auth';
import {Storage, IonicStorageModule} from "@ionic/storage";
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import { CategoriaServiceProvider } from '../providers/categoria-service/categoria-service';
import { Camera } from '@ionic-native/camera'
import { DatePicker } from '@ionic-native/date-picker'

import { OrderModule } from 'ngx-order-pipe';
import { PedidosServiceProvider } from '../providers/pedidos-service/pedidos-service';
import { TokenStorage } from '../providers/http-rest-service/TokenStorage';

// // private _url = 'http://192.168.1.248:8080/api/';
// private _url = 'http://192.168.0.49:8080/api/';

export function jwtOptionsFactory(storage: Storage) {
  return {
    tokenGetter: () => {return localStorage.getItem('jwt_token');},
    whitelistedDomains: ['localhost:8080']
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    CommonModule,
    OrderModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    }),
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'md-transition  ',
      menuType: 'overlay'
    }),
    IonicStorageModule.forRoot(),
    // IonicStorageModule.forRoot({
    //   name: 'estoque',
    //   storeName: 'agendamentos',
    //   driverOrder: ['indexeddb']
    // }),
    BrMaskerModule
  ],
  exports:[
    BrMaskerModule,
    OrderModule
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
    NativePageTransitions,
    AuthProvider,
    CategoriaServiceProvider,
    Camera,
    DatePicker,
    PedidosServiceProvider,
    TokenStorage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
