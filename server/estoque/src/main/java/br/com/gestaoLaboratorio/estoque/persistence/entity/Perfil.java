package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Perfil {

    @Id
    @GeneratedValue
    private Long id;

    private String perfil;

    private String descricao;


}
