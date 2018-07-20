package br.com.gestaoLaboratorio.estoque.persistence.entity;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Role implements GrantedAuthority {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    private String perfil;

    private String descricao;

    @Override
    public String getAuthority() {
        return perfil;
    }

}
