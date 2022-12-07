package com.algosoft.cadastroUsuario.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "_financial")
@Data
public class Financial {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;

    @Column
    private String identificator;

    @Column
    private Double value;

    @Column
    @JsonIgnore
    private Long owner;

    @Column(columnDefinition = "boolean default false")
    private Boolean expend;


}
