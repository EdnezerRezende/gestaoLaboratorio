package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;

@Data
public class EmailPedido {
    private Usuario usuario;
    private String emailDestinatario;
}
