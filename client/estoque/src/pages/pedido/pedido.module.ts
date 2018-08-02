import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoPage } from './pedido';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    PedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoPage),
    OrderModule
  ],
  providers: [
    PedidoPage
  ]
})
export class PedidoPageModule {}
