package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Role;
import br.com.gestaoLaboratorio.estoque.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> listaRoles() {

        return roleRepository.findAll();
    }

    public void salvar(Role role) {

        roleRepository.saveAndFlush(role);

    }
}
