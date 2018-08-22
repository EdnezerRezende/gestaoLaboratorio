package br.com.gestaoLaboratorio.estoque;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "app")
@Component
@Data
public class AppConfig {
    private String secret;

    private long tokenValidityInSeconds;

}
