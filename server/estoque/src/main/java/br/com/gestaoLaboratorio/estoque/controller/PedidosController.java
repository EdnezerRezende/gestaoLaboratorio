package br.com.gestaoLaboratorio.estoque.controller;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Produto;
import br.com.gestaoLaboratorio.estoque.service.PedidosService;
import br.com.gestaoLaboratorio.estoque.util.Datas;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos/")
public class PedidosController {

    @Autowired
    private PedidosService pedidosService;


    @RequestMapping(value = "gerarRelatorioPedidos", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void obterEstoqueGeral() throws FileNotFoundException, JRException {

        pedidosService.gerarRelatorioPedidos();
    }

    @RequestMapping(value = "obterPedidos", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Produto> obterPedidos() {

        return pedidosService.obterProdutosASerPedidos(Datas.obterDataAtualyyyyMMdd(), false, false);
    }
}
