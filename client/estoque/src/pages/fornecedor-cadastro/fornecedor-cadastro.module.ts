import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FornecedorCadastroPage } from './fornecedor-cadastro';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    FornecedorCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(FornecedorCadastroPage),
    BrMaskerModule
  ],
  providers:[
    FornecedorCadastroPage
  ]
})
export class FornecedorCadastroPageModule {}
