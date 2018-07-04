import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FornecedorCadastroPage } from './fornecedor-cadastro';

@NgModule({
  declarations: [
    FornecedorCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(FornecedorCadastroPage),
  ],
  providers:[
    FornecedorCadastroPage
  ]
})
export class FornecedorCadastroPageModule {}
