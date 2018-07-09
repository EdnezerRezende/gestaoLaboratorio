import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProdutoPage } from '../pages/produto/produto';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { TabsPage } from '../pages/tabs/tabs';
import { FornecedorPage } from '../pages/fornecedor/fornecedor';
import { ProdutoCadastroPage } from '../pages/produto-cadastro/produto-cadastro';
import { ListagemProdutoPage } from '../pages/listagem-produto/listagem-produto';
import { FornecedorCadastroPage } from '../pages/fornecedor-cadastro/fornecedor-cadastro';
import { FornecedorListagemPage } from '../pages/fornecedor-listagem/fornecedor-listagem';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:any = TabsPage.name;
  showLevel1 = null;

  // public paginas = [
  //   {titulo: 'Produtos', 
  //             componente: ProdutoPage.name, 
  //             icone: 'ios-flask-outline'},

  //   {titulo: 'Fornecedores', componente: FornecedorPage.name, icone: 'ios-medkit-outline'}
  // ];

  public paginas = [
    {titulo: "Produtos", 
              subTitulo: [{submenu:"Cadastro", componente:ProdutoCadastroPage.name, iconeSub: "ios-paper-outline"
                },{submenu:"Listar", componente:ListagemProdutoPage.name, iconeSub:"ios-list-box-outline"}], 
              icone: 'ios-flask-outline'},

    {titulo: 'Fornecedores', subTitulo: [{submenu:"Cadastro", componente:FornecedorCadastroPage.name, iconeSub: "ios-paper-outline"
  },{submenu:"Listar", componente:FornecedorListagemPage.name, iconeSub:"ios-list-box-outline"}], icone: 'ios-medkit-outline'}
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private _usuariosService: UsuariosServiceProvider, private _nativePageTransitions: NativePageTransitions) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  irPagina(componente){
    let options: NativeTransitionOptions={
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50

    };
    this._nativePageTransitions.slide(options);
    this.nav.push(componente);
  }
  
  get avatar() {
    return this._usuariosService.obtemAvatar();
  }

  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }

  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };

}

