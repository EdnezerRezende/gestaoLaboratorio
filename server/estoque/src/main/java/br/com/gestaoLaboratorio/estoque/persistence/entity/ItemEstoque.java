package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
public class ItemEstoque {

    @Id
    @GeneratedValue
    private Long id;

    private String localEstoque;

    private String lote;

    private LocalDate dataPedido;

    private LocalDate dataValidade;

    private LocalDate dataCadastro;

    private LocalDate dataSaida;

    private Produto produto;

    private Fornecedor fornecedor;

}
