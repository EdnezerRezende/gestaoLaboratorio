package br.com.gestaoLaboratorio.estoque.controller;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Categoria;
import br.com.gestaoLaboratorio.estoque.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categoria/")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @RequestMapping(value = "listaCategoria", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Categoria> obterCategorias() {

        return categoriaService.obterCategorias();
    }

}
