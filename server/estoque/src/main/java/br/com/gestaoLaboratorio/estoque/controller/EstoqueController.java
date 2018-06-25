package br.com.gestaoLaboratorio.estoque.controller;

import br.com.gestaoLaboratorio.estoque.persistence.entity.ItemEstoque;
import br.com.gestaoLaboratorio.estoque.service.EstoqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/api/estoque/")
public class EstoqueController {


    @Autowired
    private EstoqueService estoqueService;


    @RequestMapping(value = "estoqueGeral", method = RequestMethod.GET)
    public List<ItemEstoque> obterEstoqueGeral(){

        return estoqueService.obterEstoqueGeral();
    }
}
