package br.com.gestaoLaboratorio.estoque.controller;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Produto;
import br.com.gestaoLaboratorio.estoque.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/api/produto/")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @RequestMapping(value = "salvar", method = POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void salvar(@RequestBody(required = true) Produto produto){
        produtoService.salvar(produto);
    }

    @RequestMapping(value = "listaProdutos", method = GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Produto> listaProdutos(){

        return produtoService.listaProdutos();
    }

    @RequestMapping(value = "excluirProduto/{id}", method = DELETE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String excluirProduto(@PathVariable(value = "id") Long idProduto){
        return produtoService.excluirProduto(idProduto);
    }
}
