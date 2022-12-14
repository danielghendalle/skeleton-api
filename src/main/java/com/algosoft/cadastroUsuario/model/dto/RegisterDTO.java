package com.algosoft.cadastroUsuario.model.dto;

import com.algosoft.cadastroUsuario.model.enums.Rules;

public class RegisterDTO {
    private String username;

    private String password;

    private Rules rules;

    public String getUsername() {
        return username;
    }
    public Rules getRules() {
        return rules;
    }

    public String getPassword() {
        return password;
    }
}
