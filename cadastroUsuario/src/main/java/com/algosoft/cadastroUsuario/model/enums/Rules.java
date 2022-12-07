package com.algosoft.cadastroUsuario.model.enums;

public enum Rules {
    ADMINISTRATOR("administrador"),
    COMMON_CLIENT("usuario");

    private final String rule;

    Rules(String rule) {
        this.rule = rule;
    }

    public String getRule() {
        return rule;
    }
}
