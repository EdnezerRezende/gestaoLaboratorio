import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioCadastroPage } from './usuario-cadastro';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    UsuarioCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioCadastroPage),
    BrMaskerModule
  ],
  providers: [
    UsuarioCadastroPage
  ]
})
export class UsuarioCadastroPageModule {}
