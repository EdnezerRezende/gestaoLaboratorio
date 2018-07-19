package br.com.gestaoLaboratorio.estoque.persistence.entity.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EstoqueDTO {

    private String codigo;

    private String nomeProduto;

    private Long quantidadeTotal;

}
