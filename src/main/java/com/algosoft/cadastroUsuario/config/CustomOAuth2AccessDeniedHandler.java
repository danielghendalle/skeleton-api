package com.algosoft.cadastroUsuario.config;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomOAuth2AccessDeniedHandler extends OAuth2AccessDeniedHandler {

    public CustomOAuth2AccessDeniedHandler(CustomWebResponseExceptionTranslator exceptionTranslator) {
        super.setExceptionTranslator(exceptionTranslator);
    }

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException ex) throws IOException, ServletException {
        throw ex;
    }

}
