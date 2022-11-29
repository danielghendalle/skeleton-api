package com.algosoft.cadastroUsuario.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.provider.error.OAuth2AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.util.WebUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Component
public class CustomOAuth2AuthenticationEntryPoint extends OAuth2AuthenticationEntryPoint {

    private final ErrorAttributes errorAttributes;
    private final HttpMessageConverter<String> messageConverter;
    private final ObjectMapper objectMapper;

    public CustomOAuth2AuthenticationEntryPoint(ErrorAttributes errorAttributes, ObjectMapper objectMapper, CustomWebResponseExceptionTranslator exceptionTranslator) {
        this.errorAttributes = errorAttributes;
        this.objectMapper = objectMapper;
        this.messageConverter = new StringHttpMessageConverter();
        super.setExceptionTranslator(exceptionTranslator);
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException ex) throws IOException, ServletException {
        try (ServerHttpResponse outputMessage = new ServletServerHttpResponse(response)) {
            HttpStatus status = HttpStatus.UNAUTHORIZED;
            outputMessage.setStatusCode(status);
            String error = this.objectMapper.writeValueAsString(getErrorAttributes(request, response, ex, status));
            this.messageConverter.write(error, MediaType.APPLICATION_JSON, outputMessage);
        }
    }

    private Map<String, Object> getErrorAttributes(HttpServletRequest request, HttpServletResponse response, AuthenticationException ex, HttpStatus status) {
        WebRequest webRequest = new ServletWebRequest(request, response);
        webRequest.setAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE, ex, WebRequest.SCOPE_REQUEST);
        webRequest.setAttribute(WebUtils.ERROR_STATUS_CODE_ATTRIBUTE, status.value(), WebRequest.SCOPE_REQUEST);
        return this.errorAttributes.getErrorAttributes(webRequest, getErrorAttributeOptions());
    }

    private static ErrorAttributeOptions getErrorAttributeOptions() {
        return ErrorAttributeOptions.of(ErrorAttributeOptions.Include.values());
    }

}
