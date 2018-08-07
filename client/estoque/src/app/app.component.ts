import { Component, ViewChild, enableProdMode } from '@angular/core';
import { Platform, Nav, App, IonicApp, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { TabsPage } from '../pages/tabs/tabs';
import { ProdutoCadastroPage } from '../pages/produto-cadastro/produto-cadastro';
import { ListagemProdutoPage } from '../pages/listagem-produto/listagem-produto';
import { FornecedorCadastroPage } from '../pages/fornecedor-cadastro/fornecedor-cadastro';
import { FornecedorListagemPage } from '../pages/fornecedor-listagem/fornecedor-listagem';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { EstoqueCadastroFormularioPage } from '../pages/estoque-cadastro-formulario/estoque-cadastro-formulario';
import { EstoqueListagemPage } from '../pages/estoque-listagem/estoque-listagem';
import { AuthProvider } from '../providers/auth/auth';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { PedidoPage } from '../pages/pedido/pedido';
import { UsuarioCadastroPage } from '../pages/usuario-cadastro/usuario-cadastro';
import { Usuario } from '../modelos/usuario';
import { Observable } from 'rxjs';
// import { Usuario } from '../modelos/usuario';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  // rootPage:any = TabsPage.name;
  rootPage:any = null;
  showLevel1 = null;
  
  // usuario: Usuario;
  

  mostraCadUsuario: boolean;

  public paginas = [
    {titulo: "Produtos", 
              subTitulo: [{submenu:'Cadastro', componente:ProdutoCadastroPage.name, iconeSub: 'md-paper'
                },{submenu:'Listar', componente:ListagemProdutoPage.name, iconeSub:'md-list-box'}], 
              icone: 'md-flask', mostra: true},
    {titulo: 'Fornecedores', 
              subTitulo: [{submenu:'Cadastro', componente:FornecedorCadastroPage.name, iconeSub: 'md-paper'
  },{submenu:'Listar', componente:FornecedorListagemPage.name, iconeSub:'md-list-box'}], icone: 'md-medkit', mostra: true},
  {titulo: 'Estoque', 
  subTitulo: [{submenu:'Cadastro', componente:EstoqueCadastroFormularioPage.name, iconeSub: 'md-paper'
},{submenu:'Listar', componente:EstoqueListagemPage.name, iconeSub:'md-list-box'}], icone: 'md-clipboard', mostra: true},
{titulo: "Perfil", subTitulo: [{submenu:'Alterar Senha', componente:PerfilPage.name, iconeSub: 'md-paper'
}], icone: 'md-person', mostra: true},
{titulo: "Pedidos", subTitulo: [{submenu:'Fazer Pedido', componente:PedidoPage.name, iconeSub: 'md-paper'
}], icone: 'md-mail-open', mostra: true},
{titulo: "Usuarios", subTitulo: [{submenu:'Cadastrar Usuário', componente:UsuarioCadastroPage.name, iconeSub: 'md-paper'
}], icone: 'md-contacts', mostra: this.mostraCadUsuario}

  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private _authProvider: AuthProvider,
    private _usuariosService: UsuariosServiceProvider,
    public menuCtrl: MenuController,
    private _nativePageTransitions: NativePageTransitions, 
    private _appCtrl: App) {
      if (platform.is('ios')
      || platform.is('android')
      || platform.is('windows')) {
      } 
    
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
      };
  
    this._nativePageTransitions.slide(options);
    
    this.mostraCadUsuario = this.usuarioLogado.cpf === '78671043134';
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
      splashScreen.hide();
    });

   

    this._authProvider.authUser.subscribe(jwt => {
      if (jwt) {
        this.rootPage = TabsPage.name;
      }
      else {
        this.rootPage = LoginPage.name;
      }
    });

    this._authProvider.checkLogin();
  }

  
   logoff(){
     this._usuariosService.setMenuLateralLogoff();
     localStorage.removeItem('jwt_token');
     this._authProvider.logout();
    
     window.location.reload();
    
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

  get mostraMenuLateral(){
    return this._usuariosService.obterMenuLateral();
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

