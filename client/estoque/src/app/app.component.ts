import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProdutoPage } from '../pages/produto/produto';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:any = HomePage;

  public paginas = [
    {titulo: 'Produtos', componente: ProdutoPage.name, icone: 'ios-flask-outline'}
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private _usuariosService: UsuariosServiceProvider,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  irPagina(componente){
    this.nav.push(componente);
  }
  
  get avatar() {
    return this._usuariosService.obtemAvatar();
  }

  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }
}

