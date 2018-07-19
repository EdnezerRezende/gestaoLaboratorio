package br.com.gestaoLaboratorio.estoque.controller;

import br.com.gestaoLaboratorio.estoque.persistence.entity.DTO.EstoqueDTO;
import br.com.gestaoLaboratorio.estoque.persistence.entity.ItemEstoque;
import br.com.gestaoLaboratorio.estoque.service.EstoqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;

@RestController
@RequestMapping("/api/estoque/")
public class EstoqueController {


    @Autowired
    private EstoqueService estoqueService;


    @RequestMapping(value = "listaEstoque", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<ItemEstoque> obterEstoqueGeral() {

        return estoqueService.obterEstoqueGeral();
    }

    @RequestMapping(value = "totalEstoque", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<EstoqueDTO> totalEstoque() {

        return estoqueService.obterTotalEstoque();
    }


    @RequestMapping(value = "salvar", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void salvarItemEstoque(@RequestBody(required = true) ItemEstoque itemEstoque) {

        estoqueService.salvarAtualizar(itemEstoque);
    }

    @RequestMapping(value = "excluirItemEstoque/{id}", method = DELETE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public String excluirItemEstoque(@PathVariable(value = "id") Long idItemEstoque) {
        return estoqueService.excluirItemEstoque(idItemEstoque);
    }
}
