package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.EmailPedido;
import br.com.gestaoLaboratorio.estoque.util.Datas;
import net.sf.jasperreports.engine.JRException;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailAttachment;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.MultiPartEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.time.LocalDate;

@Service
public class EnviarEmailService {

    @Autowired
    private PedidosService pedidosService;

    public void gerarPedidos(EmailPedido emailPedido) {

        LocalDate hoje = Datas.obterDataAtualyyyyMMdd();

        File existeArquivo = new File("src//main//java//br//com//gestaoLaboratorio//estoque//relatorios//pedidos_" + hoje + ".pdf");

        if (!existeArquivo.exists()) {
            try {
                pedidosService.gerarRelatorioPedidos(emailPedido.getProdutos());
            } catch (FileNotFoundException e) {
                throw new RuntimeException("Não foi possível gerar o arquivo da Lista de Pedidos, favor tentar mais tarde!");
            } catch (JRException e) {
                throw new RuntimeException("Ocorreu um erro, favor tentar mais tarde!");
            }
        }
        enviarEmailPedido(emailPedido, hoje);
    }


    private void enviarEmailPedido(EmailPedido emailPedido, LocalDate hoje) {
        try {
            // Create the attachment
            EmailAttachment attachment = new EmailAttachment();
            attachment.setPath("src//main//java//br//com//gestaoLaboratorio//estoque//relatorios//pedidos_" + hoje + ".pdf");
            attachment.setDisposition(EmailAttachment.ATTACHMENT);
            attachment.setDescription("Lista de Pedidos");
            attachment.setName("Pedidos " + hoje + ".pdf");


            MultiPartEmail email = new MultiPartEmail();
            email.setHostName("smtp.googlemail.com");
            email.setSmtpPort(465);
            email.setAuthenticator(new DefaultAuthenticator("gestaolaboratorioestoque@gmail.com", "ludileca12"));
            email.setSSLOnConnect(true);

            email.setFrom("gestaolaboratorioestoque@gmail.com");
            email.addCc(emailPedido.getUsuario().getEmail(), "gestaolaboratorioestoque@gmail.com");
            email.setSubject("CBM/DF - Pedidos de materiais");
            email.setMsg("Prezados,\nEstamos por meio deste e-mail, solicitando os produtos que estão em formulário anexo.\n Aguardamos confirmação e data de entrega.   " +
                    "\nMuito Obrigado! ");
            email.attach(attachment); // adiciona o anexo à mensagem
            email.addTo(emailPedido.getEmailDestinatario());
            email.send();

        } catch (EmailException e) {
            throw new RuntimeException("Não foi possível enviar o e-mail, tente novamente mais tarde!");
        }
    }
}
