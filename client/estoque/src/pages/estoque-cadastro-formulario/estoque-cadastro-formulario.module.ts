import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstoqueCadastroFormularioPage } from './estoque-cadastro-formulario';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    EstoqueCadastroFormularioPage,
  ],
  imports: [
    IonicPageModule.forChild(EstoqueCadastroFormularioPage),
    BrMaskerModule
  ],
})
export class EstoqueCadastroFormularioPageModule {}
