import { Usuario } from "./usuario";
import { Produto } from "./produtos";

export class EmailPedido{
    usuario: Usuario;
    emailDestinatario:String;
    produtos: Produto[];
}