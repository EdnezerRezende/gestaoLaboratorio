package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Pedidos {
    @Id
    @GeneratedValue
    private Long id;

    private LocalDate dataPedido;

    private Long quantidade;

    private String solicitante;

    @OneToMany
    private List<Produto> produto;

    @ManyToOne
    private Fornecedor fornedor;

}
