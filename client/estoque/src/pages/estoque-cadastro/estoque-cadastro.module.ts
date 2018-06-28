import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstoqueCadastroPage } from './estoque-cadastro';

@NgModule({
  declarations: [
    EstoqueCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(EstoqueCadastroPage),
  ],
})
export class EstoqueCadastroPageModule {}
