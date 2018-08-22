package br.com.gestaoLaboratorio.estoque.controller;


import br.com.gestaoLaboratorio.estoque.persistence.entity.Fornecedor;
import br.com.gestaoLaboratorio.estoque.service.FornecedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/api/fornecedor/")
public class FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @RequestMapping(value = "listaFornecedor", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Fornecedor> obterFornecedores() {
        return fornecedorService.listaFornecedor();
    }

    @RequestMapping(value = "salvar", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void salvarFornecedor(@RequestBody(required = true) Fornecedor fornecedor) {

        fornecedorService.salvarAtualizar(fornecedor);
    }

    @RequestMapping(value = "excluirFornecedor/{id}", method = POST, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void excluirProduto(@PathVariable(value = "id") Long idFornecedor) {
        fornecedorService.excluirFornecedor(idFornecedor);
    }
}
