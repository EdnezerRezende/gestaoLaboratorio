package br.com.gestaoLaboratorio.estoque.controller;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Usuario;
import br.com.gestaoLaboratorio.estoque.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/api/usuario/")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @RequestMapping(value = "salvar", method = POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void salvar(@RequestBody(required = true) Usuario usuario) {
        usuarioService.salvar(usuario);
    }

    @RequestMapping(value = "listaUsuarios", method = GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Usuario> listaUsuario() {

        return usuarioService.listaUsuarios();
    }

    @RequestMapping(value = "usuarioLogado", method = POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Usuario usuarioLogado(@RequestBody(required = true) String email) {

        return usuarioService.lookup(email);
    }

}
