import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstoqueListagemPage } from './estoque-listagem';

@NgModule({
  declarations: [
    EstoqueListagemPage,
  ],
  imports: [
    IonicPageModule.forChild(EstoqueListagemPage),
  ],
})
export class EstoqueListagemPageModule {}
