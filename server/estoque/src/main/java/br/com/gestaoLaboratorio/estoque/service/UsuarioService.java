package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Usuario;
import br.com.gestaoLaboratorio.estoque.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public Usuario loadUserByUsername(String email) {
        List<Usuario> usuarios = usuarioRepository.findAllByEmailEquals(email);

        if (usuarios.isEmpty()) {
            throw new UsernameNotFoundException("Usuario " + email + " não foi encontrado");
        }

        return usuarios.get(0);
    }

    public void salvar(Usuario usuario) {
        if (usuario.getId() == null) {
            usuario.setDataCadastro(LocalDate.now());
        }

        usuarioRepository.saveAndFlush(usuario);
    }

    public List<Usuario> listaUsuarios() {

        return usuarioRepository.findAll();
    }
}
