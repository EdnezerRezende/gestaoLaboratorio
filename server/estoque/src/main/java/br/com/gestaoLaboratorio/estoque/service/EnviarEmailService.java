package br.com.gestaoLaboratorio.estoque.service;

import br.com.gestaoLaboratorio.estoque.persistence.entity.EmailPedido;
import br.com.gestaoLaboratorio.estoque.persistence.entity.Pedidos;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnviarEmailService {

    public void gerarPedidos(EmailPedido emailPedido) {

        enviarEmailPedido(emailPedido);
    }

    private List<Pedidos> listaPedidos() {

        return null;
    }

    private void enviarEmailPedido(EmailPedido emailPedido) {
        try {

//            // Create the attachment
//            EmailAttachment attachment = new EmailAttachment();
//            attachment.setPath("mypictures/john.jpg");
//            attachment.setDisposition(EmailAttachment.ATTACHMENT);
//            attachment.setDescription("Lista de Pedidos");
//            attachment.setName("Pedidos");


            Email email = new SimpleEmail();
            email.setHostName("smtp.googlemail.com");
            email.setSmtpPort(465);
            email.setAuthenticator(new DefaultAuthenticator("gestaolaboratorioestoque@gmail.com", "ludileca12"));
            email.setSSLOnConnect(true);

            email.setFrom("gestaolaboratorioestoque@gmail.com");
            email.addCc(emailPedido.getUsuario().getEmail(), "gestaolaboratorioestoque@gmail.com");
            email.setSubject("CBM/DF - Pedidos de materiais");
            email.setMsg("Estamos por meio deste e-mail, solicitando os produtos que estão em formulário anexo, aguardamos confirmação e data de entrega. " +
                    "Muito Obrigado! ");
//            email.attach(attachment); // adiciona o anexo à mensagem
            email.addTo(emailPedido.getEmailDestinatario());
            email.send();

        } catch (EmailException e) {
            e.printStackTrace();
        }
    }
}
