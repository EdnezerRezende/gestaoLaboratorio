import { Produto } from "./produtos";

export class ItemEstoque{
    id: number;
    localEstoque: string;
    lote: string;
    qtdUtilizado: number;
    dataPedido: Date;
    dataValidade: Date;
    dataCadastro: Date;
    dataSaida: Date;
    produto: Produto;
    // fornecedor: Fornecedor;
}