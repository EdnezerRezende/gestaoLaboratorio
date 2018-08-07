package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Role;
import br.com.gestaoLaboratorio.estoque.persistence.entity.Usuario;
import br.com.gestaoLaboratorio.estoque.repository.RoleRepository;
import br.com.gestaoLaboratorio.estoque.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    public void salvar(Usuario usuario) throws Exception {
        if (usuario.getId() == null) {
            Boolean existeUsuario = usuarioRepository.existsUsuarioByEmailEquals(usuario.getEmail());
            if (!existeUsuario) {
                usuario.setDataCadastro(LocalDate.now());
                usuario.setBloqueado(false);
                List<Role> perfil = roleRepository.findAllById(1L);
                usuario.setPerfil(perfil);
                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
                usuario.setSenha(usuario.getCpf().substring(0, 4));
                usuario.encodePassword(passwordEncoder);
            } else {
                throw new Exception("Já existe o usuário " + usuario.getEmail() + " informado");
            }
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
