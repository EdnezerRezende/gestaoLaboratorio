import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoCadastroPage } from './produto-cadastro';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    ProdutoCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoCadastroPage),
    BrMaskerModule
  ],
  exports:[
    ProdutoCadastroPage
  ]
})
export class CadastroProdutoPageModule {} 
