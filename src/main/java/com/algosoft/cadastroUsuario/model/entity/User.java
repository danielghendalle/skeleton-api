package com.algosoft.cadastroUsuario.model.entity;

import com.algosoft.cadastroUsuario.model.enums.Rules;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "_user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String username;

    @Column
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private Rules rules;

}
