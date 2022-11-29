package com.algosoft.cadastroUsuario.config;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;
import org.springframework.security.oauth2.provider.error.DefaultWebResponseExceptionTranslator;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Component
public class CustomWebResponseExceptionTranslator extends DefaultWebResponseExceptionTranslator {

    private final ErrorAttributes errorAttributes;
    private final HttpServletRequest request;

    public CustomWebResponseExceptionTranslator(ErrorAttributes errorAttributes, HttpServletRequest request) {
        this.errorAttributes = errorAttributes;
        this.request = request;
    }

    @Override
    public ResponseEntity<OAuth2Exception> translate(Exception e) throws Exception {
        ResponseEntity<OAuth2Exception> res = super.translate(e);
        WebRequest request = new ServletWebRequest(this.request, null);
        request.setAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE, res.getBody(), WebRequest.SCOPE_REQUEST);
        request.setAttribute(WebUtils.ERROR_STATUS_CODE_ATTRIBUTE, res.getStatusCode().value(), WebRequest.SCOPE_REQUEST);
        return new ResponseEntity(getErrorAttributes(request), res.getHeaders(), res.getStatusCode());
    }

    private Map<String, Object> getErrorAttributes(WebRequest request) {
        return this.errorAttributes.getErrorAttributes(request, getErrorAttributeOptions());
    }

    private static ErrorAttributeOptions getErrorAttributeOptions() {
        return ErrorAttributeOptions.of(ErrorAttributeOptions.Include.values());
    }

}