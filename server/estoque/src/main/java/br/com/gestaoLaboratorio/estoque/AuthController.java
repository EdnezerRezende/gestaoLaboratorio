package br.com.gestaoLaboratorio.estoque;

import br.com.gestaoLaboratorio.estoque.persistence.entity.Usuario;
import br.com.gestaoLaboratorio.estoque.security.jwt.TokenProvider;
import br.com.gestaoLaboratorio.estoque.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
public class AuthController {
    private final UsuarioService userService;

    private final TokenProvider tokenProvider;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthController(PasswordEncoder passwordEncoder, UsuarioService userService,
                          TokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;

//        Usuario user = new Usuario();
//        user.setEmail("admin");
//        user.setSenha(this.passwordEncoder.encode("admin"));
//        this.userService.salvar(user);
    }

    @GetMapping("/api/authenticate")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void authenticate() {
        // we don't have to do anything here
        // this is just a secure endpoint and the JWTFilter
        // validates the token
        // this service is called at startup of the app to check
        // if the jwt token is still valid
    }

    @PostMapping("/api/login")
    public String authorize(@Valid @RequestBody Usuario loginUser,
                            HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginUser.getUsername(), loginUser.getPassword());

        try {
            authenticationManager.authenticate(authenticationToken);
            return tokenProvider.createToken(loginUser.getUsername());
        } catch (AuthenticationException e) {
            EstoqueApplicationConfiguration.logger.info("Security exception {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }
    }

    @PostMapping("/api/signup")
    public String signup(@RequestBody Usuario signupUser) {
        if (userService.usernameExists(signupUser.getUsername())) {
            return "EXISTS";
        }

        signupUser.encodePassword(passwordEncoder);
        userService.salvar(signupUser);
        return tokenProvider.createToken(signupUser.getUsername());
    }
}
