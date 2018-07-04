import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FornecedorListagemPage } from './fornecedor-listagem';

@NgModule({
  declarations: [
    FornecedorListagemPage,
  ],
  imports: [
    IonicPageModule.forChild(FornecedorListagemPage),
  ],
  providers:[
    FornecedorListagemPage
  ]
})
export class FornecedorListagemPageModule {}
