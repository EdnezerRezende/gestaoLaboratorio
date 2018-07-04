package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Fornecedor {

    @Id
    @GeneratedValue
    private Long id;

    private String nomeFornecedor;

    private String endereco;

    private String cep;

    private String cidade;

    private String uf;

    private String nomeContato;

    private int telefoneContato;

    private String cnpj;

    private String contrato;

}
