package br.com.gestaoLaboratorio.estoque;

import br.com.gestaoLaboratorio.estoque.security.AppUserDetailService;
import br.com.gestaoLaboratorio.estoque.security.jwt.JWTConfigurer;
import br.com.gestaoLaboratorio.estoque.security.jwt.TokenProvider;
import br.com.gestaoLaboratorio.estoque.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AppUserDetailService appUserDetailService;

    public SecurityConfiguration(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/api/usuario/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/usuario/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/produto/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/api/produto/listaProdutos").hasRole("ADMIN")
                .antMatchers("/").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and().formLogin()
                .and().httpBasic()
                .and().apply(new JWTConfigurer(tokenProvider))
                .and().sessionManagement()
                .and().logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(appUserDetailService)
                .passwordEncoder(new BCryptPasswordEncoder(12));
    }

    // Forma recomendada de ignorar no filtro de segurança as requisições para recursos estáticos
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/resources/**");
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
