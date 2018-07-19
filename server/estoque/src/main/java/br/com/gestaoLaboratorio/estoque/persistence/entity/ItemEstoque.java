package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class ItemEstoque {

    @Id
    @GeneratedValue
    private Long id;

    private String localEstoque;

    private String lote;

    private Long qtdUtilizado;

    private LocalDate dataPedido;

    private LocalDate dataValidade;

    private LocalDate dataCadastro;

    private LocalDate dataSaida;

    private Boolean ativo;

    @OneToOne
    private Produto produto;

    @OneToOne
    private Fornecedor fornecedor;

    // @OneToMany
    //private List<ItemProdutoHistorico> itemProdutoHistorico;

    @Transient
    private Long quantidadeTotal;


}
