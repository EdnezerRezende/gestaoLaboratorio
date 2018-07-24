package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String codigoProduto;

    private String nome;

    private String descricao;

    @OneToOne
    private Categoria categoria;

    private Long qtdMinimaEstoque;

    private Boolean ativo;

}
