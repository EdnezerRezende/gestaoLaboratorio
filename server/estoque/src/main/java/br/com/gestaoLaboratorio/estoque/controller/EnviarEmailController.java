package br.com.gestaoLaboratorio.estoque.controller;

import br.com.gestaoLaboratorio.estoque.persistence.entity.EmailPedido;
import br.com.gestaoLaboratorio.estoque.service.EnviarEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email/")
public class EnviarEmailController {

    @Autowired
    private EnviarEmailService enviarEmailService;

    @RequestMapping(value = "enviar", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void enviaEmailPedido(@RequestBody(required = true) EmailPedido emailPedido) {
        //Query para obter lista de produtos a solicitar
        enviarEmailService.gerarPedidos(emailPedido);

    }
}
