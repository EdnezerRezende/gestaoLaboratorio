package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

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

    @DateTimeFormat
    private LocalDate dataPedido;

    private LocalDate dataValidade;

    @DateTimeFormat
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
