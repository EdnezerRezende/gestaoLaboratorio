import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstoquePesquisarPage } from './estoque-pesquisar';

@NgModule({
  declarations: [
    EstoquePesquisarPage,
  ],
  imports: [
    IonicPageModule.forChild(EstoquePesquisarPage),
  ],
})
export class EstoquePesquisarPageModule {}
