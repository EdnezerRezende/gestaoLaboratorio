package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;

import java.util.List;

@Data
public class EmailPedido {
    private Usuario usuario;
    private String emailDestinatario;
    private List<Produto> produtos;
}
