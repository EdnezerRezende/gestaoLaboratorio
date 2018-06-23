package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.time.LocalDate;

@Entity
@Data
public class Usuario {

    @Id
    @GeneratedValue
    private Long id;

    private String nome;

    private String matricula;

    private LocalDate dataNascimento;

    private String endereco;

    private String cep;

    private LocalDate dataCadastro;

    private Boolean bloqueado;

    @OneToOne
    private Perfil perfil;
}
