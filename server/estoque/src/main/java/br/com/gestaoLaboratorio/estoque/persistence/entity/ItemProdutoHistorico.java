package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class ItemProdutoHistorico {

    @Id
    @GeneratedValue
    private Long id;

    private LocalDate dataUtilizado;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private ItemEstoque itemEstoque;

}
