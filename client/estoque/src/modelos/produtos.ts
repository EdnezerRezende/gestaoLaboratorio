import { Categoria } from "./categoria";

export class Produto {
    id: number;
    codigoProduto: string;
    nome: string;
    descricao: string;
    categoria: Categoria;
    qtdMinimaEstoque: number;
}