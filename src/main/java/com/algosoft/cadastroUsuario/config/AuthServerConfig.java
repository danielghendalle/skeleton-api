package com.algosoft.cadastroUsuario.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.*;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableAuthorizationServer
public class AuthServerConfig extends AuthorizationServerConfigurerAdapter {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsService userDetailsService;
    private final CustomWebResponseExceptionTranslator exceptionTranslator;
    private final CustomOAuth2AuthenticationEntryPoint authenticationEntryPoint;
    private final CustomOAuth2AccessDeniedHandler accessDeniedHandler;


    public AuthServerConfig(AuthenticationManager authenticationManager,
                            PasswordEncoder passwordEncoder,
                            @Qualifier("userService") UserDetailsService userDetailsService, CustomWebResponseExceptionTranslator exceptionTranslator, CustomOAuth2AuthenticationEntryPoint authenticationEntryPoint, CustomOAuth2AccessDeniedHandler accessDeniedHandler) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
        this.exceptionTranslator = exceptionTranslator;
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.accessDeniedHandler = accessDeniedHandler;
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) {
        security.passwordEncoder(this.passwordEncoder)
                .realm("api")
                .tokenKeyAccess("permitAll()")
                .checkTokenAccess("permitAll()")
                .authenticationEntryPoint(this.authenticationEntryPoint)
                .accessDeniedHandler(this.accessDeniedHandler);
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory()
                .withClient("admin")
                .secret(this.passwordEncoder.encode("admin"))
                .accessTokenValiditySeconds(3000)
                .refreshTokenValiditySeconds(6000)
                .authorizedGrantTypes("password", "authorization_code", "refresh_token")
                .scopes("any")
                .resourceIds("api");
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints.accessTokenConverter(this.accessTokenConverter())
                .tokenStore(this.tokenStore())
                .userDetailsService(this.userDetailsService)
                .authenticationManager(this.authenticationManager)
                .exceptionTranslator(this.exceptionTranslator);
    }

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        JwtAccessTokenConverter jwtAccessTokenConverter = new JwtAccessTokenConverter();
        jwtAccessTokenConverter.setSigningKey("123");
        jwtAccessTokenConverter.setAccessTokenConverter(this.defaultAccessTokenConverter());
        return jwtAccessTokenConverter;
    }

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(this.accessTokenConverter());
    }

    @Bean
    public AccessTokenConverter defaultAccessTokenConverter() {
        DefaultAccessTokenConverter accessTokenConverter = new DefaultAccessTokenConverter();
        accessTokenConverter.setUserTokenConverter(this.defaultUserAuthenticationConverter());
        return accessTokenConverter;
    }

    @Bean
    public UserAuthenticationConverter defaultUserAuthenticationConverter() {
        DefaultUserAuthenticationConverter defaultUserAuthenticationConverter = new DefaultUserAuthenticationConverter();
        defaultUserAuthenticationConverter.setUserDetailsService(this.userDetailsService);
        return defaultUserAuthenticationConverter;
    }

}
