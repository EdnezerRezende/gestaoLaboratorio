import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstoqueListagemConsolidadaPage } from './estoque-listagem-consolidada';

@NgModule({
  declarations: [
    EstoqueListagemConsolidadaPage,
  ],
  imports: [
    IonicPageModule.forChild(EstoqueListagemConsolidadaPage),
  ],
})
export class EstoqueListagemConsolidadaPageModule {}
