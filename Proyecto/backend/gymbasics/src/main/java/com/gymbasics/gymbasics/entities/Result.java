package com.gymbasics.gymbasics.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "results")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long serie;

    private String attr1;

    private String attr2;

    @ManyToOne
    @JoinColumn(name = "id_activity")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Activity activity;
}
