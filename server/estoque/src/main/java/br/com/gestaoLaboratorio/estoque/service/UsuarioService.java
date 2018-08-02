package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Usuario;
import br.com.gestaoLaboratorio.estoque.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public void salvar(Usuario usuario) {
        if (usuario.getId() == null) {
            usuario.setDataCadastro(LocalDate.now());
        }

        usuarioRepository.saveAndFlush(usuario);
    }

    public List<Usuario> listaUsuarios() {

        return usuarioRepository.findAll();
    }

    public boolean usernameExists(String username) {
        return usuarioRepository.existsUsuarioByEmailEquals(username);
    }

    public Usuario lookup(String email) {
        return usuarioRepository.findByEmailEquals(email);
    }

}
